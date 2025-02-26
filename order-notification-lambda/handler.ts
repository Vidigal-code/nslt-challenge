import * as mongoose from 'mongoose';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import Order from './order.model';
import * as dotenv from 'dotenv';
import { throwCustomError } from './exception';

dotenv.config();

const snsClient = new SNSClient({
    region: process.env.AWS_REGION,
});

export const sendOrderNotification = async (event: any) => {

    return mongoose.connect(process.env.MONGODB_URI!)
        .then(() => {
            const orderData = JSON.parse(event.body);
            const order = new Order(orderData);

            return order.save()
                .then(() => {
                    const snsParams = {
                        Message: `New order created with ID: ${order.id}`,
                        TopicArn: process.env.SNS_TOPIC_ARN!,
                    };

                    const command = new PublishCommand(snsParams);
                    return snsClient.send(command)
                        .then(() => {
                            return {
                                statusCode: 200,
                                body: JSON.stringify({
                                    message: 'Order notification sent successfully!',
                                }),
                            };
                        })
                        .catch((snsError) => {
                            throwCustomError('Failed to send SNS notification', snsError.statusCode);
                        });
                })
                .catch((orderSaveError) => {
                    throwCustomError('Failed to save the order', orderSaveError.statusCode);
                });
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            throwCustomError('Error occurred while connecting to the database', error.statusCode);
        });
};
