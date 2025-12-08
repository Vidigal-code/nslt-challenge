import { NotificationPort } from '../../domain/ports/notification.port';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port';
import { SuccessMessages } from '../../shared/success';
import { ok } from '../../shared/http';

export class ProcessSalesReportUseCase {
    constructor(
        private readonly orderRepo: OrderRepositoryPort,
        private readonly notifier: NotificationPort
    ) {}

    async execute() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const orders = await this.orderRepo.findSince(yesterday);

        const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders > 0 ? Number((totalSales / totalOrders).toFixed(2)) : 0;

        const productCount: Record<string, number> = {};
        orders.forEach(order => order.productIds?.forEach(id => {
            if (!id) return;
            productCount[id] = (productCount[id] || 0) + 1;
        }));
        const topProducts = Object.entries(productCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([productId, count]) => ({ productId, count }));

        const reportData = {
            date: new Date().toISOString().split('T')[0],
            totalSales: Number(totalSales.toFixed(2)),
            totalOrders,
            avgOrderValue,
            topProducts,
        };

        await this.notifier.publish({
            type: 'SALES_REPORT',
            report: reportData,
            timestamp: new Date().toISOString(),
        });

        return ok({
            success: true,
            message: SuccessMessages.OK,
            report: reportData,
        });
    }
}

