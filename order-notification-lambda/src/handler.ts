import * as mongoose from 'mongoose';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import Order from './order.model';
import { throwCustomError } from './exception';
import './config';

const snsClient = new SNSClient({
    region: process.env.AWS_REGION,
});

export const sendOrderNotification = async (event: any) => {
    try {
        // Connect to MongoDB using environment variable (make sure it's MONGO_URI or MONGODB_URI consistently)
        await mongoose.connect(process.env.MONGO_URI!);

        // Parse order data from event body
        const orderData = JSON.parse(event.body);

        // Create new order document
        const order = new Order(orderData);

        // Save order to MongoDB
        await order.save();

        // Prepare SNS message parameters
        const snsParams = {
            Message: `New order created with ID: ${order._id}`, // use _id for mongoose
            TopicArn: process.env.SNS_TOPIC_ARN!,
        };

        // Publish message to SNS
        const command = new PublishCommand(snsParams);
        await snsClient.send(command);

        // Return success response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Order notification sent successfully!',
            }),
        };
    } catch (error: any) {
        console.error('Error occurred:', error);

        // You might want to differentiate errors here based on error types or codes
        throwCustomError(
            error.message || 'An unexpected error occurred',
            error.statusCode || 500
        );
    }
};
