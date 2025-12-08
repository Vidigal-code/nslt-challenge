import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDashboardQuery } from '../queries/get-dashboard.query';
import { DashboardService } from '../use-cases/dashboard.service';

@QueryHandler(GetDashboardQuery)
export class GetDashboardHandler implements IQueryHandler<GetDashboardQuery> {
    constructor(private readonly dashboardService: DashboardService) {}

    async execute(query: GetDashboardQuery) {
        const { filters } = query;
        const normalizedFilters = {
            ...filters,
            startDate: filters.startDate ? new Date(filters.startDate) : undefined,
            endDate: filters.endDate ? new Date(filters.endDate) : undefined,
        };
        return this.dashboardService.getAggregatedData(normalizedFilters);
    }
}

