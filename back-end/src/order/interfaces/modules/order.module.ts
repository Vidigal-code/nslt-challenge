import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderController } from '../http/order.controller';
import { OrderService } from '../../application/use-cases/order.service';
import { Order, OrderSchema } from '../schemas/order.schema';
import { CreateOrderHandler } from '../../application/handlers/create-order.handler';
import { UpdateOrderHandler } from '../../application/handlers/update-order.handler';
import { DeleteOrderHandler } from '../../application/handlers/delete-order.handler';
import { GetOrderHandler } from '../../application/handlers/get-order.handler';
import { ListOrdersHandler } from '../../application/handlers/list-orders.handler';
import { ORDER_REPOSITORY, ORDER_NOTIFICATION_PORT } from '../../../domain/tokens';
import { OrderMongoRepository } from '../../infrastructure/order.mongo-repository';
import { HttpOrderNotificationAdapter } from '../../infrastructure/order.notification-http.adapter';

@Module({
    imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), CqrsModule],
    controllers: [OrderController],
    providers: [
        OrderService,
        CreateOrderHandler,
        UpdateOrderHandler,
        DeleteOrderHandler,
        GetOrderHandler,
        ListOrdersHandler,
        { provide: ORDER_REPOSITORY, useClass: OrderMongoRepository },
        { provide: ORDER_NOTIFICATION_PORT, useClass: HttpOrderNotificationAdapter },
    ],
})
export class OrderModule {}