export type LedgerType = 'income' | 'expense';

export interface LedgerApiEntry {
    LedgerEntryID: number;
    Title: string;
    Category: string;
    Type: LedgerType;
    Amount: number;
    OccurredDate: string;
    Memo?: string | null;
    CreateDate?: string;
    UpdateDate?: string;
}

export interface LedgerEntry {
    id: number;
    title: string;
    category: string;
    type: LedgerType;
    amount: number;
    occurredDate: string;
    memo?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface LedgerFormInput {
    title: string;
    category: string;
    type: LedgerType;
    amount: number;
    occurredDate: string;
    memo?: string | null;
}

export const mapLedgerFromApi = (row: LedgerApiEntry): LedgerEntry => ({
    id: row.LedgerEntryID,
    title: row.Title,
    category: row.Category,
    type: row.Type,
    amount: row.Amount,
    occurredDate: row.OccurredDate,
    memo: row.Memo ?? undefined,
    createdAt: row.CreateDate,
    updatedAt: row.UpdateDate,
});

export const toLedgerPayload = (input: LedgerFormInput) => ({
    title: input.title,
    category: input.category,
    type: input.type,
    amount: input.amount,
    occurredDate: input.occurredDate,
    memo: input.memo ?? null,
});

export const toDateInputValue = (date: Date | string) => {
    const target = typeof date === 'string' ? new Date(date) : date;
    if (Number.isNaN(target.getTime())) {
        return '';
    }
    const offset = new Date(target.getTime() - target.getTimezoneOffset() * 60000);
    return offset.toISOString().slice(0, 10);
};

export const formatLedgerAmount = (amount: number, type: LedgerType) => {
    const formatted = amount.toLocaleString(undefined, { maximumFractionDigits: 0 });
    return `${type === 'expense' ? '-' : '+'}${formatted}원`;
};
