import axios from 'axios';
import {ApiException} from "./exeption/ApiException";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Fetches the list of all products from the API.
 *
 * @returns {Promise<Object[]>} A promise that resolves with the list of products.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * fetchProducts()
 *   .then(products => console.log(products))
 *   .catch(error => console.error(error));
 */
export const fetchProducts = async () => {
    return axios.get(`${API_URL}/products`)
        .then(response => response.data)
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to fetch products',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Creates a new product in the system by sending a POST request to the /products endpoint.
 *
 * @param {Object} product - The product data to be created.
 * @returns {Promise<Object>} A promise that resolves with the created product data.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * const newProduct = { name: 'Product Name', price: 29.99 };
 * createProduct(newProduct)
 *   .then(product => console.log(product))
 *   .catch(error => console.error(error));
 */
export const createProduct = async (product: any) => {
    return axios.post(`${API_URL}/products`, product)
        .then(response => response.data)
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to create product',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Updates an existing product by sending a PUT request to the /products/{productId} endpoint.
 *
 * @param {string} productId - The ID of the product to be updated.
 * @param {Object} product - The updated product data.
 * @returns {Promise<Object>} A promise that resolves with the updated product data.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * const updatedProduct = { name: 'Updated Product Name', price: 39.99 };
 * updateProduct('product-id-123', updatedProduct)
 *   .then(product => console.log(product))
 *   .catch(error => console.error(error));
 */
export const updateProduct = async (productId: string, product: any) => {
    return axios.put(`${API_URL}/products/${productId}`, product)
        .then(response => response.data)
        .catch(error => {
            console.log(error.message);
            throw new ApiException(
                error?.message || 'Failed to update product',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Deletes an existing product by sending a DELETE request to the /products/{productId} endpoint.
 *
 * @param {string} productId - The ID of the product to be deleted.
 * @returns {Promise<Object>} A promise that resolves with a success message upon successful deletion.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * deleteProduct('product-id-123')
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */
export const deleteProduct = async (productId: string) => {
    return axios.delete(`${API_URL}/products/${productId}`)
        .then(() => {
            return { success: true, message: 'Delete Product successful' };
        })
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to delete product',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Fetches the list of all categories from the API.
 *
 * @returns {Promise<Object[]>} A promise that resolves with the list of categories.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * fetchCategories()
 *   .then(categories => console.log(categories))
 *   .catch(error => console.error(error));
 */
export const fetchCategories = async () => {
    return axios.get(`${API_URL}/categories`)
        .then(response => response.data)
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to fetch categories',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Creates a new category in the system by sending a POST request to the /categories endpoint.
 *
 * @param {Object} category - The category data to be created.
 * @returns {Promise<Object>} A promise that resolves with the created category data.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * const newCategory = { name: 'New Category', description: 'Category description' };
 * createCategory(newCategory)
 *   .then(category => console.log(category))
 *   .catch(error => console.error(error));
 */
export const createCategory = async (category: any) => {
    return axios.post(`${API_URL}/categories`, category)
        .then(response => response.data)
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to create category',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Updates an existing category by sending a PUT request to the /categories/{categoryId} endpoint.
 *
 * @param {string} categoryId - The ID of the category to be updated.
 * @param {Object} category - The updated category data.
 * @returns {Promise<Object>} A promise that resolves with the updated category data.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * const updatedCategory = { name: 'Updated Category', description: 'Updated description' };
 * updateCategory('category-id-123', updatedCategory)
 *   .then(category => console.log(category))
 *   .catch(error => console.error(error));
 */
export const updateCategory = async (categoryId: string, category: any) => {
    return axios.put(`${API_URL}/categories/${categoryId}`, category)
        .then(response => response.data)
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to update category',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Deletes an existing category by sending a DELETE request to the /categories/{categoryId} endpoint.
 *
 * @param {string} categoryId - The ID of the category to be deleted.
 * @returns {Promise<Object>} A promise that resolves with a success message upon successful deletion.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * deleteCategory('category-id-123')
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */
export const deleteCategory = async (categoryId: string) => {
    return axios.delete(`${API_URL}/categories/${categoryId}`)
        .then(() => {
            return { success: true, message: 'Delete Category successful' };
        })
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to delete category',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Fetches the list of all orders from the API.
 *
 * @returns {Promise<Object[]>} A promise that resolves with the list of orders.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * fetchOrders()
 *   .then(orders => console.log(orders))
 *   .catch(error => console.error(error));
 */
export const fetchOrders = async () => {
    return axios.get(`${API_URL}/orders`)
        .then(response => response.data)
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to fetch orders',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Creates a new order in the system by sending a POST request to the /orders endpoint.
 *
 * @param {Object} order - The order data to be created.
 * @returns {Promise<Object>} A promise that resolves with the created order data.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * const newOrder = { productId: '123', quantity: 2 };
 * createOrder(newOrder)
 *   .then(order => console.log(order))
 *   .catch(error => console.error(error));
 */
export const createOrder = async (order: any) => {
    return axios.post(`${API_URL}/orders`, order)
        .then(response => response.data)
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to create order',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Updates an existing order by sending a PUT request to the /orders/{orderId} endpoint.
 *
 * @param {string} orderId - The ID of the order to be updated.
 * @param {Object} order - The updated order data.
 * @returns {Promise<Object>} A promise that resolves with the updated order data.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * const updatedOrder = { productId: '123', quantity: 3 };
 * updateOrder('order-id-456', updatedOrder)
 *   .then(order => console.log(order))
 *   .catch(error => console.error(error));
 */
export const updateOrder = async (orderId: string, order: any) => {
    return axios.put(`${API_URL}/orders/${orderId}`, order)
        .then(response => response.data)
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to update order',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Deletes an existing order by sending a DELETE request to the /orders/{orderId} endpoint.
 *
 * @param {string} orderId - The ID of the order to be deleted.
 * @returns {Promise<Object>} A promise that resolves with a success message upon successful deletion.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * deleteOrder('order-id-456')
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */
export const deleteOrder = async (orderId: string) => {
    return axios.delete(`${API_URL}/orders/${orderId}`)
        .then(() => {
            return { success: true, message: 'Delete Order successful' };
        })
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to delete order',
                error?.response?.status || 500,
                error?.response?.data
            );
        });
};

/**
 * Fetches dashboard data based on the provided filters from the API.
 *
 * @param {Object} filters - An object containing key-value pairs for filtering the dashboard data.
 * @returns {Promise<Object>} A promise that resolves with the dashboard data or an error response object in case of failure.
 * @throws {ApiException} If the request fails, an ApiException is thrown with error details.
 *
 * @example
 * const filters = { dateRange: 'last30Days', status: 'active' };
 * fetchDashboardData(filters)
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
export const fetchDashboardData = async (filters: any) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
    });

    return axios.get(`${API_URL}/dashboard?${params.toString()}`)
        .then(response => response.data)
        .catch(error => {
            throw new ApiException(
                error?.message || 'Failed to fetch dashboard data',
                error?.response?.status || 500,
                error?.response?.data || { success: false, data: null }
            );
        });
};