import { Injectable } from '@nestjs/common';
import { OrderNotificationPort } from '../../domain/ports/order-notification.port';

@Injectable()
export class HttpOrderNotificationAdapter implements OrderNotificationPort {
    async notify(order: { _id: string; total: number; productIds: string[]; date: Date }): Promise<void> {
        const lambdaEndpoint = process.env.API_LAMBDA;

        if (!lambdaEndpoint) {
            console.warn('\n⚠️ [ORDER SERVICE] Lambda endpoint not configured - Skipping notification');
            return;
        }

        const notificationPayload = {
            orderId: order._id.toString(),
            total: order.total,
            productIds: order.productIds,
            date: order.date
        };

        try {
            const response = await fetch(lambdaEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notificationPayload),
                signal: AbortSignal.timeout(5000)
            });

            if (response.ok) {
                console.log('\n✅ [ORDER SERVICE] Lambda notification sent successfully');
                return;
            }

            const errorText = await response.text();
            console.error(`\n❌ [ORDER SERVICE] Lambda responded with error: ${response.status} - ${errorText}`);
        } catch (error: any) {
            console.error('\n❌ [ORDER SERVICE] Failed to connect to Lambda:', error.message);
        }
    }
}

