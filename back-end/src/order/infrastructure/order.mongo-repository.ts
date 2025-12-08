import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from '../interfaces/schemas/order.schema';
import { CreateOrderDto, UpdateOrderDto } from '../application/dto/order.dto';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Errors } from 'src/shared/errors';

export class OrderMongoRepository implements OrderRepository {
    constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

    async create(payload: CreateOrderDto): Promise<Order> {
        const created = new this.orderModel(payload);
        return created.save();
    }

    async insertMany(payload: CreateOrderDto[]): Promise<Order[]> {
        return this.orderModel.insertMany(payload);
    }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async findById(id: string): Promise<Order | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.orderModel.findById(id).exec();
    }

    async update(id: string, payload: UpdateOrderDto): Promise<Order | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.orderModel.findByIdAndUpdate(id, payload, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        await this.orderModel.findByIdAndDelete(id).exec();
    }

    async deleteMany(): Promise<void> {
        await this.orderModel.deleteMany({}).exec();
    }
}

