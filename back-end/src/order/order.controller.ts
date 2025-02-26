import { Controller, Get, Post, Body, Param, Put, Delete, HttpException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { Types } from 'mongoose';
import { handleError } from '../exception/exception.handle';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto).catch(error => handleError(error));
    }

    @Get()
    findAll() {
        return this.orderService.findAll().catch(error => handleError(error));
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        return this.orderService.findOne(id).catch(error => handleError(error, id));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        return this.orderService.update(id, updateOrderDto).catch(error => handleError(error, id));
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        return this.orderService.delete(id).catch(error => handleError(error, id));
    }
}
