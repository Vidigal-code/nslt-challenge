import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const createdOrder = new this.orderModel(createOrderDto);
        return createdOrder.save();
    }

    async createMany(createOrderDtos: CreateOrderDto[]): Promise<Order[]> {
        return this.orderModel.insertMany(createOrderDtos);
    }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async findOne(id: string): Promise<Order | null> {
        return this.orderModel.findById(id).exec();
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
        return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.orderModel.findByIdAndDelete(id).exec();
    }

    async deleteAll(): Promise<void> {
        await this.orderModel.deleteMany({}).exec();
    }
}