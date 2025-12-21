const HomePage = () => {
  return (
    <section className="page-section">
      <div className="page-card">
        <div className="page-card__header">
          <div>
            <p className="page-card__eyebrow">대시보드</p>
            <h2>오늘의 재무 워크스페이스</h2>
          </div>
          <span className="status-chip">준비중</span>
        </div>
        <p>
          주요 지표와 알림 요약을 이곳에 배치할 예정입니다. 필요한 카드나 위젯 구성을 알려주시면
          맞춰서 구성하겠습니다.
        </p>
      </div>
    </section>
  );
};

export default HomePage;
