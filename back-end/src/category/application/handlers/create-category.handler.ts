import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../commands/create-category.command';
import { CategoryService } from '../use-cases/category.service';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
    constructor(private readonly categoryService: CategoryService) {}

    async execute(command: CreateCategoryCommand) {
        return this.categoryService.create(command.payload);
    }
}

