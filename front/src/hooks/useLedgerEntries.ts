import {useQuery} from '@tanstack/react-query';
import {fetchAxios} from '../common/api/apis.ts';
import type {LedgerApiEntry, LedgerEntry} from '../utils/ledgerTypes.ts';
import {mapLedgerFromApi} from '../utils/ledgerTypes.ts';

export const useLedgerEntries = (range: { startDate: string; endDate: string }) => {
    return useQuery<LedgerEntry[], Error>({
        queryKey: ['ledger', range.startDate, range.endDate],
        queryFn: async () => {
            const params = new URLSearchParams({
                startDate: range.startDate,
                endDate: range.endDate,
            });
            const rows = await fetchAxios<LedgerApiEntry[]>(`/ledger?${params.toString()}`);
            return rows.map(mapLedgerFromApi);
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 30,
    });
};
