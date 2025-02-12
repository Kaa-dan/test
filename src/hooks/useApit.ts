import { useState } from 'react';

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

interface UseAPIOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
}

export const useAPI = (options: UseAPIOptions = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async <T,>(
        url: string,
        options: any
    ): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(url, {
                ...options,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            const data: any = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Request failed');
            }

            if (options.onSuccess) {
                options.onSuccess(data.data);
            }

            return data.data || null;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            if (options.onError) {
                options.onError(errorMessage);
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, fetchData };
};