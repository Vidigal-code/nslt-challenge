import { CreateOrderDto, UpdateOrderDto } from 'src/order/application/dto/order.dto';
import { Order } from 'src/order/interfaces/schemas/order.schema';

export interface OrderRepository {
    create(payload: CreateOrderDto): Promise<Order>;
    insertMany(payload: CreateOrderDto[]): Promise<Order[]>;
    findAll(): Promise<Order[]>;
    findById(id: string): Promise<Order | null>;
    update(id: string, payload: UpdateOrderDto): Promise<Order | null>;
    delete(id: string): Promise<void>;
    deleteMany(): Promise<void>;
}

