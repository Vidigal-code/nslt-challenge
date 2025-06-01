import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import Order from './models/order';
import { throwCustomError } from './exception/exception';
import mongoose from 'mongoose';
import { config } from './config';


// Configure SNS client for local development with LocalStack
const snsClient = new SNSClient({
    region: config.awsRegion || 'us-east-1',
    ...(config.nodeEnv  === 'development' && {
        endpoint: 'http://localhost:4566',
        credentials: {
            accessKeyId: 'test',
            secretAccessKey: 'test'
        }
    })
});

export const sendOrderNotification = async (event: any) => {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.mongoUri!);

        // Parse and validate data
        const orderData = JSON.parse(event.body);

        // Basic validation
        if (!orderData.orderId || !orderData.total) {
            throwCustomError('Missing required order fields (orderId, total)', 400);
        }

        // IMPORTANT: Lambda only sends notifications - does NOT create orders
        // The order should already exist (created by NestJS backend)
        const existingOrder = await Order.findById(orderData.orderId);

        if (!existingOrder) {
            throwCustomError('Order not found in database', 404);
            return; // Add explicit return after throwing error
        }

        // Prepare and send SNS notification
        const snsParams = {
            Message: JSON.stringify({
                orderId: existingOrder._id,
                total: existingOrder.total,
                productCount: existingOrder.productIds.length,
                date: existingOrder.date,
                message: `New order notification sent for ID: ${existingOrder._id}`,
                timestamp: new Date().toISOString()
            }),
            TopicArn: config.snsTopicArn!,
        };

        try {
            const command = new PublishCommand(snsParams);
            await snsClient.send(command);
            console.log('✅ SNS notification sent successfully');
        } catch (snsError: any) {
            console.warn('⚠️ SNS service unavailable (likely LocalStack not running), logging notification instead:', snsError.message);

            // Fallback: Log notification when SNS is not available
            console.log('\n📧 [NOTIFICATION LOGGED]', {
                orderId: existingOrder._id,
                total: existingOrder.total,
                productCount: existingOrder.productIds.length,
                date: existingOrder.date,
                timestamp: new Date().toISOString()
            });
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: `Order notification processed successfully!`,
                orderId: existingOrder._id,
                total: existingOrder.total
            }),
        };

    } catch (error: any) {
        console.error('Error occurred:', error);

        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({
                success: false,
                error: error.message || 'An unexpected error occurred'
            }),
        };
    } finally {
        // Close MongoDB connection
        await mongoose.connection.close();
    }
};

// Sales report processing function
export const processSalesReport = async (event: any) => {
    try {
        await mongoose.connect(config.mongoUri!);

        // Search for orders from the last period
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const orders = await Order.find({
            date: { $gte: yesterday }
        });

        // Calculate statistics
        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

        const reportData = {
            date: new Date().toISOString().split('T')[0],
            totalSales,
            totalOrders,
            avgOrderValue,
            topProducts: await getTopProducts(orders)
        };

        // Try to send report via SNS, fallback to logging
        const snsParams = {
            Message: JSON.stringify({
                type: 'SALES_REPORT',
                report: reportData,
                timestamp: new Date().toISOString()
            }),
            TopicArn: config.snsTopicArn!,
        };

        try {
            const command = new PublishCommand(snsParams);
            await snsClient.send(command);
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
                report: reportData
            }),
        };

    } catch (error: any) {
        console.error('Error processing sales report:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: error.message
            }),
        };
    } finally {
        await mongoose.connection.close();
    }
};

// Helper function for top products analysis
async function getTopProducts(orders: any[]) {
    const productCount: { [key: string]: number } = {};

    orders.forEach(order => {
        order.productIds.forEach((productId: string) => {
            productCount[productId] = (productCount[productId] || 0) + 1;
        });
    });

    return Object.entries(productCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([productId, count]) => ({ productId, count }));
}