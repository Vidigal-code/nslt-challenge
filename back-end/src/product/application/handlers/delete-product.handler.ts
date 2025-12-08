import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../commands/delete-product.command';
import { ProductService } from '../use-cases/product.service';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
    constructor(private readonly productService: ProductService) {}

    async execute(command: DeleteProductCommand) {
        return this.productService.delete(command.id);
    }
}

