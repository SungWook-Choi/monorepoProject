import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {type DateSelectArg, type EventClickArg, type DatesSetArg} from '@fullcalendar/core';
import koLocale from '@fullcalendar/core/locales/ko';
import {useMemo} from 'react';
import LedgerForm from '../component/LedgerForm.tsx';
import {useLedgerEntries} from '../hooks/ledger/useLedgerEntries.ts';
import {useLedgerMutations} from '../hooks/ledger/useLedgerMutations.ts';
import {useLedgerStore} from '../stores/ledgerStore.ts';
import type {LedgerFormInput} from '../utils/ledgerTypes.ts';
import {formatLedgerAmount, toDateInputValue} from '../utils/ledgerTypes.ts';

const LedgerPage = () => {
    const {range, setRange, isFormOpen, formMode, selectedDate, activeEntry, openCreate, openEdit, closeForm} =
        useLedgerStore();
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

    const handleDateSelect = (selectionInfo: DateSelectArg) => {
        openCreate(toDateInputValue(selectionInfo.start));
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        const entry = ledgerEntries.find((item) => item.id.toString() === clickInfo.event.id);
        if (entry) {
            openEdit(entry);
        }
    };

    const handleDatesSet = (rangeInfo: DatesSetArg) => {
        const start = toDateInputValue(rangeInfo.start);
        const end = toDateInputValue(new Date(rangeInfo.end.getTime() - 1000 * 60 * 60 * 24));
        if (range.startDate !== start || range.endDate !== end) {
            setRange({ startDate: start, endDate: end });
        }
    };

    const handleSubmit = async (payload: LedgerFormInput) => {
        if (formMode === 'create') {
            await createEntry(payload);
        } else if (activeEntry) {
            await updateEntry(activeEntry.id, payload);
        }
        closeForm();
    };

    const handleDelete = async () => {
        if (!activeEntry) return;
        await deleteEntry(activeEntry.id);
        closeForm();
    };

    return (
        <section className="page-section">
            <div className="page-card">
                <div className="page-card__header">
                    <div>
                        <p className="page-card__eyebrow">가계부</p>
                        <h2>달력에서 일정 관리</h2>
                    </div>
                    <div className="ledger-header__meta">
                        <div className="ledger-legend">
                            <span className="ledger-legend__dot" style={{ background: '#12b76a' }} />
                            수입 {totals.income.toLocaleString()}원
                            <span className="ledger-legend__dot" style={{ background: '#d92c20' }} />
                            지출 {totals.expense.toLocaleString()}원
                        </div>
                        {isLoading && <span className="status-chip">불러오는 중...</span>}
                    </div>
                </div>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    locales={[koLocale]}
                    initialView="dayGridMonth"
                    selectable
                    selectMirror
                    height="auto"
                    events={events}
                    eventClick={handleEventClick}
                    select={handleDateSelect}
                    datesSet={handleDatesSet}
                    eventDisplay="block"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: '',
                    }}
                    locale="ko"
                    dayMaxEvents={3}
                    initialDate={selectedDate}
                />
            </div>
            {isFormOpen && (
                <LedgerForm
                    mode={formMode}
                    defaultValue={activeEntry}
                    date={selectedDate}
                    onSubmit={handleSubmit}
                    onDelete={formMode === 'edit' ? handleDelete : undefined}
                    onClose={closeForm}
                    isSubmitting={isMutating}
                    isDeleting={deletePending}
                />
            )}
        </section>
    );
};

export default LedgerPage;
