export interface DashboardFilters {
    categoryId?: string;
    productId?: string;
    startDate?: string | Date;
    endDate?: string | Date;
    period?: string;
}

export class GetDashboardQuery {
    constructor(public readonly filters: DashboardFilters) {}
}

