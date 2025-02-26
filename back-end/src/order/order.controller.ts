import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { Types } from 'mongoose';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        return this.orderService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        return this.orderService.update(id, updateOrderDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        return this.orderService.delete(id);
    }
}
