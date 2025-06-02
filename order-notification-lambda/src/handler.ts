/*
# Test Offline Example

## 2. Asynchronous Task (Serverless Framework)

This section demonstrates how to use the **Serverless Framework** to create an **AWS Lambda function** that performs an asynchronous task in the background.

### 2.1. Lambda Function

We will create a Lambda function to process **sales reports** based on **orders**. This example shows how to handle background tasks that do not require immediate user interaction.
*/

import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import Order from './models/order';
import mongoose from 'mongoose';
import { config } from './config';
import { z } from 'zod';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

//import { throwCustomError } from './exception/exception';

// --- Setup SNS Client (with LocalStack fallback)
const snsClient = new SNSClient({
    region: config.awsRegion || 'us-east-1',
    ...(config.nodeEnv === 'development' && {
        endpoint: config.localstackEndpoint,
        credentials: {
            accessKeyId: config.awsAccessKeyId || 'test',
            secretAccessKey: config.awsSecretAccessKey || 'test',
        },
    }),
});

// --- MongoDB connection management
async function connectToMongo(): Promise<void> {
    if (mongoose.connection.readyState === 1) {
        // Already connected
        return;
    }
    try {
        if (!config.mongoUri) {
            throw new Error('MongoDB URI is not configured');
        }
        await mongoose.connect(config.mongoUri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

// --- Input validation schema with zod
const orderNotificationSchema = z.object({
    orderId: z.string().min(1, 'Order ID is required'),
    total: z.number().positive('Total must be a positive number'),
});

// --- Simple retry helper for SNS publishing
async function sendWithRetry(params: any, retries = 3): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const command = new PublishCommand(params);
            await snsClient.send(command);
            console.log('✅ SNS notification sent successfully');
            return;
        } catch (error: any) {
            console.warn(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt === retries) {
                throw error;
            }
            await new Promise((resolve) => setTimeout(resolve, 500 * attempt)); // simple backoff
        }
    }
}

// --- Lambda handler: Send order notification
export const sendOrderNotification = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        await connectToMongo();

        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    error: 'Request body is required'
                })
            };
        }

        let parsedBody;
        try {
            parsedBody = JSON.parse(event.body);
        } catch (parseError) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid JSON in request body'
                })
            };
        }

        const validationResult = orderNotificationSchema.safeParse(parsedBody);
        if (!validationResult.success) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    error: 'Validation failed',
                    details: validationResult.error.errors
                })
            };
        }

        const orderData = validationResult.data;

        // Find existing order in DB
        const existingOrder = await Order.findById(orderData.orderId);

        if (!existingOrder) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    success: false,
                    error: 'Order not found in database'
                })
            };
        }

        // Validate SNS Topic ARN is configured
        if (!config.snsTopicArn) {
            console.warn('⚠️ SNS Topic ARN not configured, logging notification instead');
            console.log('\n📧 [NOTIFICATION LOGGED]', {
                orderId: existingOrder._id,
                total: existingOrder.total,
                productCount: existingOrder.productIds?.length || 0,
                date: existingOrder.date,
                timestamp: new Date().toISOString(),
            });

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'Order notification logged (SNS not configured)',
                    orderId: existingOrder._id,
                    total: existingOrder.total,
                }),
            };
        }

        // Prepare SNS message
        const snsParams = {
            Message: JSON.stringify({
                orderId: existingOrder._id,
                total: existingOrder.total,
                productCount: existingOrder.productIds?.length || 0,
                date: existingOrder.date,
                message: `New order notification sent for ID: ${existingOrder._id}`,
                timestamp: new Date().toISOString(),
            }),
            TopicArn: config.snsTopicArn,
        };

        try {
            await sendWithRetry(snsParams);
        } catch (snsError: any) {
            console.warn('⚠️ SNS service unavailable after retries, logging notification instead:', snsError.message);
            console.log('\n📧 [NOTIFICATION LOGGED]', {
                orderId: existingOrder._id,
                total: existingOrder.total,
                productCount: existingOrder.productIds?.length || 0,
                date: existingOrder.date,
                timestamp: new Date().toISOString(),
            });
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Order notification processed successfully!',
                orderId: existingOrder._id,
                total: existingOrder.total,
            }),
        };
    } catch (error: any) {
        console.error('Error occurred:', error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({
                success: false,
                error: error.message || 'An unexpected error occurred',
            }),
        };
    }
};

// --- Helper to get top products from orders
function getTopProducts(orders: Array<{ productIds: string[] }>): Array<{ productId: string; count: number }> {
    const productCount: Record<string, number> = {};

    orders.forEach(order => {
        if (order.productIds && Array.isArray(order.productIds)) {
            order.productIds.forEach(productId => {
                if (productId) { // Ensure productId is not null/undefined
                    productCount[productId] = (productCount[productId] || 0) + 1;
                }
            });
        }
    });

    return Object.entries(productCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([productId, count]) => ({ productId, count }));
}

// --- Lambda handler: Process sales report
export const processSalesReport = async (): Promise<APIGatewayProxyResult> => {
    try {
        await connectToMongo();

        // Date filter: last 24 hours
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Aggregate total sales and orders
        const aggResult = await Order.aggregate([
            { $match: { date: { $gte: yesterday } } },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$total' },
                    totalOrders: { $sum: 1 },
                    productIds: { $push: '$productIds' },
                },
            },
        ]);

        const totalSales = aggResult[0]?.totalSales || 0;
        const totalOrders = aggResult[0]?.totalOrders || 0;
        const avgOrderValue = totalOrders > 0 ? Number((totalSales / totalOrders).toFixed(2)) : 0;

        // Fetch orders with productIds for top products calculation
        const orders = await Order.find({ date: { $gte: yesterday } }).select('productIds').lean();

        const topProducts = getTopProducts(orders);

        const reportData = {
            date: new Date().toISOString().split('T')[0],
            totalSales: Number(totalSales.toFixed(2)),
            totalOrders,
            avgOrderValue,
            topProducts,
        };

        // Validate SNS Topic ARN is configured
        if (!config.snsTopicArn) {
            console.warn('⚠️ SNS Topic ARN not configured, logging report instead');
            console.log('\n📊 [SALES REPORT LOGGED]', reportData);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'Sales report logged (SNS not configured)',
                    report: reportData,
                }),
            };
        }

        // Prepare SNS message
        const snsParams = {
            Message: JSON.stringify({
                type: 'SALES_REPORT',
                report: reportData,
                timestamp: new Date().toISOString(),
            }),
            TopicArn: config.snsTopicArn,
        };

        try {
            await sendWithRetry(snsParams);
            console.log('✅ Sales report sent via SNS');
        } catch (snsError: any) {
            console.warn('⚠️ SNS service unavailable, logging report instead:', snsError.message);
            console.log('\n📊 [SALES REPORT LOGGED]', reportData);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Sales report processed successfully',
                report: reportData,
            }),
        };
    } catch (error: any) {
        console.error('Error processing sales report:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: error.message || 'An unexpected error occurred',
            }),
        };
    }
};