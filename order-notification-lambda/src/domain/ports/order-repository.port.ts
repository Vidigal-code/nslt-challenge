import { OrderEntity } from '../entities/order';

export interface OrderRepositoryPort {
    findById(id: string): Promise<OrderEntity | null>;
    findSince(date: Date): Promise<OrderEntity[]>;
}

