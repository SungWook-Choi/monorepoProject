import {useEffect} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {API_BASE_URL, fetchAxios} from '../common/api/apis.ts';
import {useAuthStore} from '../stores/authStore.ts';
import type {AuthUser} from '../types/auth.ts';

export const useAuth = () => {
    const queryClient = useQueryClient();
    const {user, status, setUser, setStatus} = useAuthStore();

    useEffect(() => {
        if (status === 'idle') {
            setStatus('loading');
        }
    }, [status, setStatus]);

    const meQuery = useQuery<AuthUser, Error>({
        queryKey: ['auth', 'me'],
        queryFn: () => fetchAxios<AuthUser>('/auth/me'),
        enabled: status === 'loading',
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (meQuery.isSuccess && meQuery.data) {
            setUser(meQuery.data);
        }
        if (meQuery.isError) {
            setStatus('unauthenticated');
        }
    }, [meQuery.isSuccess, meQuery.data, meQuery.isError, setStatus, setUser]);

    const logoutMutation = useMutation({
        mutationFn: () => fetchAxios<{ ok: boolean }>('/auth/logout'),
        onSuccess: () => {
            setStatus('unauthenticated');
            queryClient.removeQueries({queryKey: ['auth']});
        },
        onError: () => setStatus('unauthenticated'),
    });

    const refreshProfile = async () => {
        setStatus('loading');
        return meQuery.refetch();
    };

    return {
        user,
        status,
        isLoading: status === 'loading' || meQuery.isFetching,
        isLoggingOut: logoutMutation.isPending,
        loginUrl: `${API_BASE_URL}/auth/google`,
        refreshProfile,
        logout: logoutMutation.mutateAsync,
    };
};
