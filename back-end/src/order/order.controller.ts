import { Controller, Get, Post, Body, Param, Put, Delete, HttpException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { Types } from 'mongoose';
import { FindOneDto } from "../types/find.one.dto";
import {handleError, handleErrorMessageCustom} from '../exception/exception.handle';


@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        const total: number = createOrderDto.total;

        if (total <= 0) {
            return handleErrorMessageCustom(403, `Value not allowed: ${total}`);
        }
        return this.orderService.create(createOrderDto).catch(error => handleError(error));
    }

    @Get()
    findAll() {
        return this.orderService.findAll().catch(error => handleError(error));
    }

    @Get(':id')
    findOne(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        return this.orderService.findOne(params.id).catch(error => handleError(error, params.id));
    }

    @Put(':id')
    update(@Param() params: FindOneDto, @Body() updateOrderDto: UpdateOrderDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        const total: number = updateOrderDto.total;

        if (total <= 0) {
            return handleErrorMessageCustom(403, `Value not allowed: ${total}`);
        }
        return this.orderService.update(params.id, updateOrderDto).catch(error => handleError(error, params.id));
    }

    @Delete(':id')
    delete(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        return this.orderService.delete(params.id).catch(error => handleError(error, params.id));
    }
}
