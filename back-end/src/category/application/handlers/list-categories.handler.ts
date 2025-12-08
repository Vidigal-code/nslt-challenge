import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListCategoriesQuery } from '../queries/list-categories.query';
import { CategoryService } from '../use-cases/category.service';

@QueryHandler(ListCategoriesQuery)
export class ListCategoriesHandler implements IQueryHandler<ListCategoriesQuery> {
    constructor(private readonly categoryService: CategoryService) {}

    async execute() {
        return this.categoryService.findAll();
    }
}

