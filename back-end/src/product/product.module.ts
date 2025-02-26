import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './product.schema';
import { AwsModule } from '../aws/aws.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AwsModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
