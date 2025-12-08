import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderCommand } from '../commands/update-order.command';
import { OrderService } from '../use-cases/order.service';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
    constructor(private readonly orderService: OrderService) {}

    async execute(command: UpdateOrderCommand) {
        return this.orderService.update(command.id, command.payload);
    }
}

