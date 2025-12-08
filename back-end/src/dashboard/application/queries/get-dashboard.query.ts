export interface DashboardFilters {
    categoryId?: string;
    productId?: string;
    startDate?: string;
    endDate?: string;
    period?: string;
}

export class GetDashboardQuery {
    constructor(public readonly filters: DashboardFilters) {}
}

