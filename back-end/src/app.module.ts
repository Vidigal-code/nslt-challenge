import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';
import { AwsModule } from './aws/aws.module';
import { APP_GUARD } from '@nestjs/core';


@Module({
    imports: [
        AwsModule,
        DatabaseModule,
        ProductModule,
        CategoryModule,
        OrderModule,
        DashboardModule,
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    name: 'default',
                    ttl: 60,
                    limit: 10,
                },
                {
                    name: 'heavy',
                    ttl: 300,
                    limit: 3,
                }
            ],
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ]
})

export class AppModule {}