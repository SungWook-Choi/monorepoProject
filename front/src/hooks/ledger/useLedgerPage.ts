import {useCallback, useMemo} from 'react';
import type {DateSelectArg, EventClickArg, DatesSetArg} from '@fullcalendar/core';
import {useLedgerStore} from '../../stores/ledgerStore.ts';
import {useLedgerEntries} from './useLedgerEntries.ts';
import {useLedgerMutations} from './useLedgerMutations.ts';
import type {LedgerFormInput} from '../../utils/ledgerTypes.ts';
import {formatLedgerAmount, toDateInputValue} from '../../utils/ledgerTypes.ts';

export const useLedgerPage = () => {
    const {
        range,
        setRange,
        isFormOpen,
        formMode,
        selectedDate,
        activeEntry,
        openCreate,
        openEdit,
        closeForm,
    } = useLedgerStore();

    const {data: ledgerEntries = [], isLoading} = useLedgerEntries(range);
    const {createEntry, updateEntry, deleteEntry, isMutating, deletePending} = useLedgerMutations(range);

    const events = useMemo(
        () =>
            ledgerEntries.map((entry) => ({
                id: entry.id.toString(),
                title: `${entry.title} · ${formatLedgerAmount(entry.amount, entry.type)}`,
                start: entry.occurredDate,
                allDay: true,
                classNames: [entry.type === 'income' ? 'ledger-event--income' : 'ledger-event--expense'],
            })),
        [ledgerEntries],
    );

    const totals = useMemo(
        () =>
            ledgerEntries.reduce(
                (acc, item) => {
                    if (item.type === 'income') acc.income += item.amount;
                    else acc.expense += item.amount;
                    return acc;
                },
                { income: 0, expense: 0 },
            ),
        [ledgerEntries],
    );

    const handleDateSelect = useCallback(
        (selectionInfo: DateSelectArg) => {
            openCreate(toDateInputValue(selectionInfo.start));
        },
        [openCreate],
    );

    const handleEventClick = useCallback(
        (clickInfo: EventClickArg) => {
            const entry = ledgerEntries.find((item) => item.id.toString() === clickInfo.event.id);
            if (entry) {
                openEdit(entry);
            }
        },
        [ledgerEntries, openEdit],
    );

    const handleDatesSet = useCallback(
        (rangeInfo: DatesSetArg) => {
            const start = toDateInputValue(rangeInfo.start);
            const end = toDateInputValue(new Date(rangeInfo.end.getTime() - 1000 * 60 * 60 * 24));
            if (range.startDate !== start || range.endDate !== end) {
                setRange({ startDate: start, endDate: end });
            }
        },
        [range.endDate, range.startDate, setRange],
    );

    const handleSubmit = useCallback(
        async (payload: LedgerFormInput) => {
            if (formMode === 'create') {
                await createEntry(payload);
            } else if (activeEntry) {
                await updateEntry(activeEntry.id, payload);
            }
            closeForm();
        },
        [activeEntry, closeForm, createEntry, formMode, updateEntry],
    );

    const handleDelete = useCallback(async () => {
        if (!activeEntry) return;
        await deleteEntry(activeEntry.id);
        closeForm();
    }, [activeEntry, closeForm, deleteEntry]);

    return {
        events,
        totals,
        isLoading,
        isFormOpen,
        formMode,
        selectedDate,
        activeEntry,
        handleDateSelect,
        handleEventClick,
        handleDatesSet,
        handleSubmit,
        handleDelete,
        isMutating,
        deletePending,
        closeForm,
    };
};
