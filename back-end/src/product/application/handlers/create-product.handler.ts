import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../commands/create-product.command';
import { ProductService } from '../use-cases/product.service';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(private readonly productService: ProductService) {}

    async execute(command: CreateProductCommand) {
        const { payload, file } = command;
        if (file) {
            const imageUrl = await this.productService.uploadImage(file);
            if (imageUrl) {
                payload.imageUrl = imageUrl;
            }
        }
        return this.productService.create(payload);
    }
}

