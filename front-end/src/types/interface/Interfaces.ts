import {Category} from "../Category";
import {Order} from "../Order";
import {Product} from "../Product";

export interface DashboardKPI {
    totalOrders: number;
    totalRevenue: number;
    totalPeriods: number;
    bestPeriod: any;
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
    totalPeriods: number;
    bestPeriod: any;
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

export const ALLOWED_MIME_TYPES = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/bmp',
];

export const SIZE_VALUE_IMG: number = 10 * 1024 * 1024; // 10MB
export const SIZE_VALUE_IMG_CALC: number = 1024 * 1024; // 1MB em bytes


