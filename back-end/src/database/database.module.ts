import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from "../order/interfaces/schemas/order.schema";
import { Product, ProductSchema } from "../product/interfaces/schemas/product.schema";
import { Category, CategorySchema } from "../category/interfaces/schemas/category.schema";
import 'src/config';


@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nouslatam',
            }),
        }),
        MongooseModule.forFeature([
            { name: Order.name, schema: OrderSchema },
            { name: Product.name, schema: ProductSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    exports: [
        MongooseModule,
    ],
})
export class DatabaseModule {}