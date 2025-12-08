import { Controller, Get, Post, Body, Param, Put, Delete, HttpException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderDto, UpdateOrderDto } from '../../application/dto/order.dto';
import { Types } from 'mongoose';
import { FindOneDto } from "../../../types/find.one.dto";
import {handleError, handleErrorMessageCustom} from '../../../exception/exception.handle';
import { Errors } from 'src/shared/errors';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateOrderCommand } from '../../application/commands/create-order.command';
import { UpdateOrderCommand } from '../../application/commands/update-order.command';
import { DeleteOrderCommand } from '../../application/commands/delete-order.command';
import { GetOrderQuery } from '../../application/queries/get-order.query';
import { ListOrdersQuery } from '../../application/queries/list-orders.query';


@Controller('orders')
@ApiTags('orders')
export class OrderController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create order' })
    @ApiResponse({ status: 201, description: 'Order created' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    create(@Body() createOrderDto: CreateOrderDto) {
        const total: number = createOrderDto.total;

        if (total <= 0) {
            return handleErrorMessageCustom(403, `Value not allowed: ${total}`);
        }
        return this.commandBus.execute(new CreateOrderCommand(createOrderDto)).catch(error => handleError(error));
    }

    @Get()
    @ApiOperation({ summary: 'List orders' })
    findAll() {
        return this.queryBus.execute(new ListOrdersQuery()).catch(error => handleError(error));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get order by id' })
    @ApiParam({ name: 'id', example: '65f7f9a8b4a4b21f8c3c9b1a' })
    @ApiResponse({ status: 200, description: 'Order found' })
    @ApiResponse({ status: 400, description: 'Invalid ID format' })
    findOne(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, 400);
        }
        return this.queryBus.execute(new GetOrderQuery(params.id)).catch(error => handleError(error, params.id));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update order' })
    @ApiParam({ name: 'id', example: '65f7f9a8b4a4b21f8c3c9b1a' })
    @ApiResponse({ status: 200, description: 'Order updated' })
    update(@Param() params: FindOneDto, @Body() updateOrderDto: UpdateOrderDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, 400);
        }
        const total: number = updateOrderDto.total;

        if (total <= 0) {
            return handleErrorMessageCustom(403, `Value not allowed: ${total}`);
        }
        return this.commandBus.execute(new UpdateOrderCommand(params.id, updateOrderDto)).catch(error => handleError(error, params.id));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete order' })
    @ApiParam({ name: 'id', example: '65f7f9a8b4a4b21f8c3c9b1a' })
    @ApiResponse({ status: 200, description: 'Order deleted' })
    delete(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, 400);
        }
        return this.commandBus.execute(new DeleteOrderCommand(params.id)).catch(error => handleError(error, params.id));
    }
}
