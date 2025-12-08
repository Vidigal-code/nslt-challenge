import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListOrdersQuery } from '../queries/list-orders.query';
import { OrderService } from '../use-cases/order.service';

@QueryHandler(ListOrdersQuery)
export class ListOrdersHandler implements IQueryHandler<ListOrdersQuery> {
    constructor(private readonly orderService: OrderService) {}

    async execute() {
        return this.orderService.findAll();
    }
}

