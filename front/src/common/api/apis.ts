import axios, {type AxiosRequestConfig} from 'axios';

export const API_BASE_URL =
    import.meta.env.VITE_API_URL?.toString() ?? 'http://localhost:4000';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const fetchAxios = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await apiClient.get<T>(url, config);
    return res.data;
};

export const PostAxios = async <R = unknown, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig<B>,
): Promise<R> => {
    const res = await apiClient.post<R>(url, body, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...config,
    });
    return res.data;
};
