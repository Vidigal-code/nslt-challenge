import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { connectToMongo, buildDependencies } from './handler';

const { sendOrderNotificationUseCase, processSalesReportUseCase } = buildDependencies();

export const sendOrderNotification = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        await connectToMongo();
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, error: 'Request body is required' })
            };
        }
        const parsed = JSON.parse(event.body);
        return await sendOrderNotificationUseCase.execute(parsed);
    } catch (error: any) {
        console.error('Error occurred:', error);
        return {
            statusCode: error?.statusCode || 500,
            body: JSON.stringify({
                success: false,
                error: error?.message || 'An unexpected error occurred',
            }),
        };
    }
};

export const processSalesReport = async (): Promise<APIGatewayProxyResult> => {
    try {
        await connectToMongo();
        return await processSalesReportUseCase.execute();
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