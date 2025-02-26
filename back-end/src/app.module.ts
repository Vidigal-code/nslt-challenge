import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import {DatabaseModule} from "./database/database.module";
import {AwsModule} from "./aws/aws.module";

@Module({
    imports: [
        AwsModule,
        DatabaseModule,
        ProductModule,
        CategoryModule,
        OrderModule,
    ],
})
export class AppModule {}