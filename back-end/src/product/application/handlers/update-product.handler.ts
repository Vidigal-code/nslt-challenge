import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../commands/update-product.command';
import { ProductService } from '../use-cases/product.service';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
    constructor(private readonly productService: ProductService) {}

    async execute(command: UpdateProductCommand) {
        const { id, payload, file } = command;
        if (file) {
            const imageUrl = await this.productService.uploadImage(file);
            if (imageUrl) {
                payload.imageUrl = imageUrl;
            }
        }
        return this.productService.update(id, payload);
    }
}

