import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import LedgerForm from '../../component/LedgerForm.tsx';
import {useLedgerPage} from '../../hooks/ledger/useLedgerPage.ts';

const LedgerPage = () => {
    const {
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
    } = useLedgerPage();

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
