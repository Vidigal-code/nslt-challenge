import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ProductModule } from './product/interfaces/modules/product.module';
import { CategoryModule } from 'src/category/interfaces/modules/category.module';
import { OrderModule } from 'src/order/interfaces/modules/order.module';
import { DashboardModule } from 'src/dashboard/interfaces/modules/dashboard.module';
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