import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListProductsQuery } from '../queries/list-products.query';
import { ProductService } from '../use-cases/product.service';

@QueryHandler(ListProductsQuery)
export class ListProductsHandler implements IQueryHandler<ListProductsQuery> {
    constructor(private readonly productService: ProductService) {}

    async execute() {
        return this.productService.findAll();
    }
}

