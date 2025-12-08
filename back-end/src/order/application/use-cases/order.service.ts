import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Order } from '../../interfaces/schemas/order.schema';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import 'src/config';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { ORDER_NOTIFICATION_PORT, ORDER_REPOSITORY } from '../../../domain/tokens';
import { OrderNotificationPort } from '../../../domain/ports/order-notification.port';
import { Errors } from 'src/shared/errors';



@Injectable()
export class OrderService {
    constructor(
        @Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepository,
        @Inject(ORDER_NOTIFICATION_PORT) private readonly orderNotification: OrderNotificationPort,
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const savedOrder = await this.orderRepository.create(createOrderDto);
        await this.orderNotification.notify({
            _id: savedOrder._id.toString(),
            total: savedOrder.total,
            productIds: savedOrder.productIds.map(id => id.toString()),
            date: savedOrder.date,
        });
        return savedOrder;
    }

    /**
     * Send notification to Lambda function asynchronously
     * This method doesn't block the main order creation flow
     */
    async createMany(createOrderDtos: CreateOrderDto[]): Promise<Order[]> {
        const orders = await this.orderRepository.insertMany(createOrderDtos);
        for (const order of orders) {
            await this.orderNotification.notify({
                _id: order._id.toString(),
                total: order.total,
                productIds: order.productIds.map(id => id.toString()),
                date: order.date,
            });
        }
        return orders;
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepository.findAll();
    }

    async findOne(id: string): Promise<Order | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.orderRepository.findById(id);
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.orderRepository.update(id, updateOrderDto);
    }

    async delete(id: string): Promise<void> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        await this.orderRepository.delete(id);
    }

    async deleteAll(): Promise<void> {
        await this.orderRepository.deleteMany();
    }
}