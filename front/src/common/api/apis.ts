import axios from 'axios';

export const fetchAxios = async <T>(url: string): Promise<T> => {
    const res = await axios.get<T>(url);
    return res.data;
};

export const PostAxios = async <R = unknown, B = any>(url: string, body?: B): Promise<R> => {
    const res = await axios.post<R>(url, body, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res.data;
};
