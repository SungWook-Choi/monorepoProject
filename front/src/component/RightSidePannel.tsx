import {useState} from 'react';

const reminders = [
  {
    title: '시스템 점검',
    description: '관리자 2명에게 2단계 인증을 안내하세요.',
  },
  {
    title: '계약 만료',
    description: '이번 주 만료 예정 계약서 3건이 있습니다.',
  },
  {
    title: '새로운 요청',
    description: '지원 티켓 5건이 미처리 상태입니다.',
  },
];

const RightSidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`insight-panel${isOpen ? ' insight-panel--open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {!isOpen && <span className="insight-panel__label">알림</span>}
      {isOpen && (
        <div className="insight-panel__content">
          <p className="insight-panel__title">실시간 알림</p>
          <ul>
            {reminders.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default RightSidePanel;
