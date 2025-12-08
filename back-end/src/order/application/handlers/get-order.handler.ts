import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from '../queries/get-order.query';
import { OrderService } from '../use-cases/order.service';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
    constructor(private readonly orderService: OrderService) {}

    async execute(query: GetOrderQuery) {
        return this.orderService.findOne(query.id);
    }
}

