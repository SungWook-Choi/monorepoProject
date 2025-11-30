import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient, PostAxios} from '../../common/api/apis.ts';
import type {LedgerApiEntry, LedgerEntry, LedgerFormInput} from '../../utils/ledgerTypes.ts';
import {mapLedgerFromApi, toLedgerPayload} from '../../utils/ledgerTypes.ts';

export const useLedgerMutations = (range: { startDate: string; endDate: string }) => {
    const queryClient = useQueryClient();
    const invalidateList = () =>
        queryClient.invalidateQueries({ queryKey: ['ledger', range.startDate, range.endDate] });

    const createMutation = useMutation({
        mutationFn: (payload: LedgerFormInput) =>
            PostAxios<LedgerApiEntry, LedgerFormInput>('/ledger', toLedgerPayload(payload)),
        onSuccess: () => invalidateList(),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: LedgerFormInput }) =>
            apiClient
                .put<LedgerApiEntry>(`/ledger/${id}`, toLedgerPayload(payload))
                .then((res) => res.data),
        onSuccess: () => invalidateList(),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete<{ ok: boolean }>(`/ledger/${id}`).then((res) => res.data),
        onSuccess: () => invalidateList(),
    });

    return {
        createEntry: (payload: LedgerFormInput): Promise<LedgerEntry> =>
            createMutation.mutateAsync(payload).then(mapLedgerFromApi),
        updateEntry: (id: number, payload: LedgerFormInput): Promise<LedgerEntry> =>
            updateMutation.mutateAsync({ id, payload }).then(mapLedgerFromApi),
        deleteEntry: (id: number) => deleteMutation.mutateAsync(id),
        isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
        deletePending: deleteMutation.isPending,
    };
};
