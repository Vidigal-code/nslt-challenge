import { z } from 'zod';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port';
import { NotificationPort } from '../../domain/ports/notification.port';
import { Errors } from '../../shared/errors';
import { SuccessMessages } from '../../shared/success';
import { ok } from '../../shared/http';

const orderNotificationSchema = z.object({
    orderId: z.string().min(1, 'Order ID is required'),
    total: z.number().positive('Total must be a positive number'),
});

export class SendOrderNotificationUseCase {
    constructor(
        private readonly orderRepo: OrderRepositoryPort,
        private readonly notifier: NotificationPort
    ) {}

    async execute(payload: unknown) {
        const validationResult = orderNotificationSchema.safeParse(payload);
        if (!validationResult.success) {
            return ok({
                success: false,
                error: Errors.BAD_REQUEST,
                details: validationResult.error.issues
            }, 400);
        }

        const { orderId } = validationResult.data;
        const order = await this.orderRepo.findById(orderId);
        if (!order) {
            return ok({
                success: false,
                error: Errors.NOT_FOUND
            }, 404);
        }

        await this.notifier.publish({
            orderId: order._id,
            total: order.total,
            productCount: order.productIds?.length || 0,
            date: order.date,
            message: `New order notification sent for ID: ${order._id}`,
            timestamp: new Date().toISOString(),
        });

        return ok({
            success: true,
            message: SuccessMessages.OK,
            orderId: order._id,
            total: order.total,
        });
    }
}

