import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../commands/create-order.command';
import { OrderService } from '../use-cases/order.service';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    constructor(private readonly orderService: OrderService) {}

    async execute(command: CreateOrderCommand) {
        return this.orderService.create(command.payload);
    }
}

