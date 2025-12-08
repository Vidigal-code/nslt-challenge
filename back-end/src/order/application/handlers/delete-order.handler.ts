import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrderCommand } from '../commands/delete-order.command';
import { OrderService } from '../use-cases/order.service';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
    constructor(private readonly orderService: OrderService) {}

    async execute(command: DeleteOrderCommand) {
        return this.orderService.delete(command.id);
    }
}

