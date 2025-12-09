import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.message || error.message || 'Unexpected error';
        const wrapped = new Error(message);
        if (error?.response) {
            (wrapped as any).response = error.response;
        }
        return Promise.reject(wrapped);
    }
);

