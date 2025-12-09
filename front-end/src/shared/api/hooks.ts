import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './client';
import { Product } from '../../types/Product';
import { Category } from '../../types/Category';
import { Order } from '../../types/Order';
import { DashboardResponse } from '../../types/interface/Interfaces';

const PRODUCTS_KEY = ['products'];
const CATEGORIES_KEY = ['categories'];
const ORDERS_KEY = ['orders'];
const DASHBOARD_KEY = ['dashboard'];

export const useProductsQuery = () =>
    useQuery<Product[]>({
        queryKey: PRODUCTS_KEY,
        queryFn: async () => {
            const res = await apiClient.get('/products');
            return res.data;
        },
    });

export const useCreateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload: FormData) => {
            const res = await apiClient.post('/products', payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: PRODUCTS_KEY });
        },
    });
};

export const useUpdateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: FormData }) => {
            const res = await apiClient.put(`/products/${id}`, payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: PRODUCTS_KEY });
        },
    });
};

export const useDeleteProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            try {
                await apiClient.delete(`/products/${id}`);
                return id;
            } catch (error: any) {
                const rawMsg = error?.response?.data?.message || error?.message;
                const msg = Array.isArray(rawMsg) ? rawMsg.join(' ') : String(rawMsg || '');
                const isImageKeyError = msg.toLowerCase().includes('invalid image url or key');
                const status = error?.response?.status;

                if ((status === 500 || !status) && isImageKeyError) {
                    console.warn('Image deletion failed but product was deleted:', msg);
                    return id;
                }
                throw error;
            }
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: PRODUCTS_KEY });
        },
        onError: (error: any) => {
            console.error('Error deleting product:', error);
        },
    });
};

export const useCategoriesQuery = () =>
    useQuery<Category[]>({
        queryKey: CATEGORIES_KEY,
        queryFn: async () => {
            const res = await apiClient.get('/categories');
            return res.data;
        },
    });

export const useCreateCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload: { name: string }) => {
            const res = await apiClient.post('/categories', payload);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: CATEGORIES_KEY });
        },
    });
};

export const useUpdateCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: { name: string } }) => {
            const res = await apiClient.put(`/categories/${id}`, payload);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: CATEGORIES_KEY });
        },
    });
};

export const useDeleteCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`/categories/${id}`);
            return id;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: CATEGORIES_KEY });
        },
    });
};

export const useOrdersQuery = () =>
    useQuery<Order[]>({
        queryKey: ORDERS_KEY,
        queryFn: async () => {
            const res = await apiClient.get('/orders');
            return res.data;
        },
    });

export const useCreateOrder = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload: { productIds: string[]; total: number; date: string }) => {
            const res = await apiClient.post('/orders', payload);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ORDERS_KEY });
        },
    });
};

export const useUpdateOrder = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: { productIds: string[]; total: number; date: string } }) => {
            const res = await apiClient.put(`/orders/${id}`, payload);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ORDERS_KEY });
        },
    });
};

export const useDeleteOrder = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`/orders/${id}`);
            return id;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ORDERS_KEY });
        },
    });
};

export const useDashboardQuery = (filters: Record<string, string | number | undefined>) =>
    useQuery<DashboardResponse>({
        queryKey: [...DASHBOARD_KEY, filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, String(value));
            });
            const res = await apiClient.get(`/dashboard?${params.toString()}`);
            return res.data?.data ?? res.data;
        },
    });

