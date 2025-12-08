import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoryQuery } from '../queries/get-category.query';
import { CategoryService } from '../use-cases/category.service';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
    constructor(private readonly categoryService: CategoryService) {}

    async execute(query: GetCategoryQuery) {
        return this.categoryService.findOne(query.id);
    }
}

