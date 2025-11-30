import {useEffect, useState, type FormEvent} from 'react';
import type {LedgerEntry, LedgerFormInput, LedgerType} from '../utils/ledgerTypes.ts';

type LedgerFormProps = {
    mode: 'create' | 'edit';
    defaultValue?: LedgerEntry | null;
    date: string;
    onSubmit: (values: LedgerFormInput) => Promise<void>;
    onDelete?: () => Promise<void>;
    onClose: () => void;
    isSubmitting?: boolean;
    isDeleting?: boolean;
};

const emptyForm: LedgerFormInput = {
    title: '',
    category: '기타',
    type: 'expense',
    amount: 0,
    occurredDate: '',
    memo: '',
};

const LedgerForm = ({
    mode,
    defaultValue,
    date,
    onSubmit,
    onDelete,
    onClose,
    isSubmitting,
    isDeleting,
}: LedgerFormProps) => {
    const [form, setForm] = useState<LedgerFormInput>(emptyForm);

    useEffect(() => {
        setForm({
            title: defaultValue?.title ?? '',
            category: defaultValue?.category ?? '기타',
            type: defaultValue?.type ?? 'expense',
            amount: defaultValue?.amount ?? 0,
            occurredDate: defaultValue?.occurredDate ?? date,
            memo: defaultValue?.memo ?? '',
        });
    }, [defaultValue, date]);

    const handleChange = <K extends keyof LedgerFormInput>(key: K, value: LedgerFormInput[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit(form);
    };

    const handleDelete = async () => {
        if (mode === 'edit' && onDelete) {
            await onDelete();
        }
    };

    return (
        <div className="ledger-modal">
            <div className="ledger-modal__content">
                <div className="ledger-modal__header">
                    <div>
                        <p className="page-card__eyebrow">{mode === 'create' ? '새 일정' : '내역 수정'}</p>
                        <h3>{mode === 'create' ? '가계부 일정 추가' : '가계부 일정 업데이트'}</h3>
                    </div>
                    <button type="button" className="ghost-button" onClick={onClose}>
                        닫기
                    </button>
                </div>
                <form className="ledger-form" onSubmit={handleSubmit}>
                    <div className="ledger-form__row">
                        <label htmlFor="ledger-title">제목</label>
                        <input
                            id="ledger-title"
                            type="text"
                            value={form.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="예: 점심, 급여, 교통비"
                            required
                        />
                    </div>
                    <div className="ledger-form__row ledger-form__split">
                        <div>
                            <label htmlFor="ledger-amount">금액</label>
                            <input
                                id="ledger-amount"
                                type="number"
                                value={form.amount}
                                onChange={(e) => handleChange('amount', Number(e.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="ledger-type">유형</label>
                            <select
                                id="ledger-type"
                                value={form.type}
                                onChange={(e) => handleChange('type', e.target.value as LedgerType)}
                            >
                                <option value="expense">지출</option>
                                <option value="income">수입</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="ledger-category">카테고리</label>
                            <input
                                id="ledger-category"
                                type="text"
                                value={form.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                placeholder="식비, 교통, 월급 등"
                            />
                        </div>
                    </div>
                    <div className="ledger-form__row ledger-form__split">
                        <div>
                            <label htmlFor="ledger-date">발생 일자</label>
                            <input
                                id="ledger-date"
                                type="date"
                                value={form.occurredDate}
                                onChange={(e) => handleChange('occurredDate', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="ledger-memo">메모</label>
                            <input
                                id="ledger-memo"
                                type="text"
                                value={form.memo ?? ''}
                                onChange={(e) => handleChange('memo', e.target.value)}
                                placeholder="비고를 입력하세요"
                            />
                        </div>
                    </div>
                    <div className="ledger-form__actions">
                        {mode === 'edit' && (
                            <button
                                type="button"
                                className="ghost-button"
                                onClick={handleDelete}
                                disabled={isDeleting || isSubmitting}
                            >
                                내역 삭제
                            </button>
                        )}
                        <div className="ledger-form__actions-right">
                            <button type="button" className="ghost-button" onClick={onClose}>
                                취소
                            </button>
                            <button type="submit" disabled={isSubmitting}>
                                {mode === 'create' ? '추가하기' : '저장하기'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LedgerForm;
