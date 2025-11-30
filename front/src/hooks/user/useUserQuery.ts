import { useQuery } from '@tanstack/react-query';
import { fetchAxios } from '../../common/api/apis.ts';
import type { UserInfo } from '../../types';

const useUserQuery = () => {
    return useQuery<UserInfo>({
        queryKey: ['user'],
        queryFn: async () => {
            return await fetchAxios<UserInfo>('');
        },
        refetchOnWindowFocus: false,
        retry: 0,
    });
};
export default useUserQuery;
