import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Order} from './order.schema';
import {CreateOrderDto, UpdateOrderDto} from './order.dto';
import {handleError} from "src/exception/exception.handle";
import 'src/config';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {
    }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {

        try {
            const response = await fetch(`${process.env.API_LAMBDA}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createOrderDto),
            });

            if (!response.ok) {
                console.error(`Error sending notification: ${response.statusText}`);
            }
        } catch (e) {
            console.error('Failed to send order to Lambda:', e);
            handleError(e);
        }

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
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
        return this.orderModel.findById(id).exec();
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
        return this.orderModel.findByIdAndUpdate(id, updateOrderDto, {new: true}).exec();
    }

    async delete(id: string): Promise<void> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
        await this.orderModel.findByIdAndDelete(id).exec();
    }

    async deleteAll(): Promise<void> {
        await this.orderModel.deleteMany({}).exec();
    }
}