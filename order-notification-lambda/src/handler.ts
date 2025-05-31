import * as mongoose from 'mongoose';
import {SNSClient, PublishCommand} from '@aws-sdk/client-sns';
import Order from './models/order';
import {throwCustomError} from './exception/exception';
import './config';

const snsClient = new SNSClient({
    region: process.env.AWS_REGION,
});

export const sendOrderNotification = async (event: any) => {
    return mongoose.connect(process.env.MONGO_URI!)
        .then(() => {

            const orderData = JSON.parse(event.body);
            const order = new Order(orderData);

            //order.save();

            const snsParams = {
                Message: `New order created with ID: ${order._id}`,
                TopicArn: process.env.SNS_TOPIC_ARN!,
            };

            const command = new PublishCommand(snsParams);
            return snsClient.send(command);
        })
        .then(() => {
            const orderData = JSON.parse(event.body);
            const order = new Order(orderData);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: `OrderModel notification sent successfully! ${order._id}`,
                }),
            };
        })
        .catch((error: any) => {
            console.error('Error occurred:', error);
            throwCustomError(
                error.message || 'An unexpected error occurred',
                error.statusCode || 500
            );
        });
};
