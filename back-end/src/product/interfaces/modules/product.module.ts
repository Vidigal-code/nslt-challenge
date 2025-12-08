import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from '../http/product.controller';
import { ProductService } from '../../application/use-cases/product.service';
import { Product, ProductSchema } from '../schemas/product.schema';
import { AwsModule } from '../../../aws/aws.module';
import { CreateProductHandler } from '../../application/handlers/create-product.handler';
import { UpdateProductHandler } from '../../application/handlers/update-product.handler';
import { DeleteProductHandler } from '../../application/handlers/delete-product.handler';
import { GetProductHandler } from '../../application/handlers/get-product.handler';
import { ListProductsHandler } from '../../application/handlers/list-products.handler';
import { PRODUCT_REPOSITORY } from '../../../domain/tokens';
import { ProductMongoRepository } from '../../infrastructure/product.mongo-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AwsModule,
    CqrsModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    CreateProductHandler,
    UpdateProductHandler,
    DeleteProductHandler,
    GetProductHandler,
    ListProductsHandler,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductMongoRepository,
    }
  ],
})
export class ProductModule {}
