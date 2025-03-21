import {Category} from "./Category";
import {Order} from "./Order";
import {Product} from "./Product";

export interface DashboardKPI {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    uniqueProducts: number;
}

export interface DashboardChartItem {
    period: {
        date?: string;
        week?: number;
        year?: number;
        month?: number;
    };
    totalOrders: number;
    totalRevenue: number;
}

export interface DashboardResponse {
    kpis: DashboardKPI;
    chartData: DashboardChartItem[];
}

export interface CategoryFormProps {
    onSubmit: () => void;
    initialData?: Category | null;
}

export interface OrderFormProps {
    onSubmit: () => void;
    initialData?: Order | null;
    allProducts: string[];
}

export interface ProductFormProps {
    onSubmit: () => void;
    initialData?: Product | null;
}