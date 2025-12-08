import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from '../commands/delete-category.command';
import { CategoryService } from '../use-cases/category.service';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
    constructor(private readonly categoryService: CategoryService) {}

    async execute(command: DeleteCategoryCommand) {
        return this.categoryService.delete(command.id);
    }
}

