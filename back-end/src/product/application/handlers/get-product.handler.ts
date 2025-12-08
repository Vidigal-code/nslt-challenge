import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from '../queries/get-product.query';
import { ProductService } from '../use-cases/product.service';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
    constructor(private readonly productService: ProductService) {}

    async execute(query: GetProductQuery) {
        return this.productService.findOne(query.id);
    }
}

