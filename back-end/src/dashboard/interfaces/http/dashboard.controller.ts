
/*

3.2. KPI Dashboard
• Display metrics about Orders, for example:
• Total number of orders
• Average value per order
• Total revenue
• Orders by period (daily, weekly, monthly, etc.)

*/

import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { handleError } from '../../../exception/exception.handle';
import { GetDashboardQuery } from '../../application/queries/get-dashboard.query';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly queryBus: QueryBus) {}

    @Get()
    async getKPIData(
        @Query('category') categoryId: string,
        @Query('product') productId: string,
        @Query('start') startDate: string,
        @Query('end') endDate: string,
        @Query('period') period: string = 'daily'
    ) {
        try {
            const filters = {
                categoryId,
                productId,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
                period,
            };

            const data = await this.queryBus.execute(new GetDashboardQuery(filters));
            return { success: true, data };
        } catch (error) {
            handleError(error);
        }
    }
}
