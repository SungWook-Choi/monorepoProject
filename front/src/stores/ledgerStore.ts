import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import type {LedgerEntry} from '../utils/ledgerTypes.ts';
import {toDateInputValue} from '../utils/ledgerTypes.ts';

type LedgerFormMode = 'create' | 'edit';

type LedgerRange = {
    startDate: string;
    endDate: string;
};

type LedgerState = {
    range: LedgerRange;
    isFormOpen: boolean;
    formMode: LedgerFormMode;
    selectedDate: string;
    activeEntry: LedgerEntry | null;
};

type LedgerActions = {
    setRange: (range: LedgerRange) => void;
    openCreate: (date: string) => void;
    openEdit: (entry: LedgerEntry) => void;
    closeForm: () => void;
};

const today = new Date();
const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

const initialState: LedgerState = {
    range: {
        startDate: toDateInputValue(firstDay),
        endDate: toDateInputValue(lastDay),
    },
    isFormOpen: false,
    formMode: 'create',
    selectedDate: toDateInputValue(today),
    activeEntry: null,
};

export const useLedgerStore = create<LedgerState & LedgerActions>()(
    immer((set) => ({
        ...initialState,
        setRange: (range) =>
            set((state) => {
                if (
                    state.range.startDate === range.startDate &&
                    state.range.endDate === range.endDate
                ) {
                    return;
                }
                state.range = range;
            }),
        openCreate: (date) =>
            set((state) => {
                state.isFormOpen = true;
                state.formMode = 'create';
                state.selectedDate = date;
                state.activeEntry = null;
            }),
        openEdit: (entry) =>
            set((state) => {
                state.isFormOpen = true;
                state.formMode = 'edit';
                state.selectedDate = entry.occurredDate;
                state.activeEntry = entry;
            }),
        closeForm: () =>
            set((state) => {
                state.isFormOpen = false;
                state.activeEntry = null;
            }),
    })),
);
