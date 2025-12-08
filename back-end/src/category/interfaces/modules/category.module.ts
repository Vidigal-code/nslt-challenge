import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryService } from '../../application/use-cases/category.service';
import { CategoryController } from '../http/category.controller';
import { Category, CategorySchema } from '../schemas/category.schema';
import { Product, ProductSchema } from '../../../product/interfaces/schemas/product.schema';
import { CreateCategoryHandler } from '../../application/handlers/create-category.handler';
import { UpdateCategoryHandler } from '../../application/handlers/update-category.handler';
import { DeleteCategoryHandler } from '../../application/handlers/delete-category.handler';
import { GetCategoryHandler } from '../../application/handlers/get-category.handler';
import { ListCategoriesHandler } from '../../application/handlers/list-categories.handler';
import { CATEGORY_REPOSITORY, PRODUCT_REPOSITORY } from '../../../domain/tokens';
import { CategoryMongoRepository } from '../../infrastructure/category.mongo-repository';
import { ProductMongoRepository } from '../../../product/infrastructure/product.mongo-repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
        CqrsModule,
    ],
    providers: [
        CategoryService,
        CreateCategoryHandler,
        UpdateCategoryHandler,
        DeleteCategoryHandler,
        GetCategoryHandler,
        ListCategoriesHandler,
        {
            provide: CATEGORY_REPOSITORY,
            useClass: CategoryMongoRepository,
        },
        {
            provide: PRODUCT_REPOSITORY,
            useClass: ProductMongoRepository,
        }
    ],
    controllers: [CategoryController],
})
export class CategoryModule {}
