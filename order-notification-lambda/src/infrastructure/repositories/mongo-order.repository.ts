import Order from '../../models/order';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port';
import { OrderEntity } from '../../domain/entities/order';

export class MongoOrderRepository implements OrderRepositoryPort {
    async findById(id: string): Promise<OrderEntity | null> {
        return Order.findById(id).lean<OrderEntity | null>();
    }

    async findSince(date: Date): Promise<OrderEntity[]> {
        return Order.find({ date: { $gte: date } }).lean<OrderEntity[]>();
    }
}

