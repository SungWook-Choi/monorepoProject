import { useQuery } from '@tanstack/react-query';
import { fetchAxios } from '../../common/api/apis.ts';

type User = {
    name: string;
};
const useSampleAPIs = () => {
    return useQuery<User, Error>({
        queryKey: ['sample'],
        queryFn: () => fetchAxios<User>('/users'),
        refetchOnWindowFocus: false,
        retry: 0,
    });
};
export default useSampleAPIs;
