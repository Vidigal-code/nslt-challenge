import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from "../order/order.schema";
import { Product, ProductSchema } from "../product/product.schema";
import { Category, CategorySchema } from "../category/category.schema";
import 'src/config';


@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nouslatam'),
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