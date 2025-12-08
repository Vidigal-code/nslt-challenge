import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryCommand } from '../commands/update-category.command';
import { CategoryService } from '../use-cases/category.service';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
    constructor(private readonly categoryService: CategoryService) {}

    async execute(command: UpdateCategoryCommand) {
        return this.categoryService.update(command.id, command.payload);
    }
}

