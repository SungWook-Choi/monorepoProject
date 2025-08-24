import axios from 'axios';

export const PostAxios = async ({ url, param }: { url: string; param: object }) => {
    return await axios.post(url, param);
};
