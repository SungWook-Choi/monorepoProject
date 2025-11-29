import {Link, Outlet, useLocation} from 'react-router-dom';
import {routes} from './routes/route.tsx';
import RightSidePanel from './component/RightSidePannel.tsx';

const Layout = () => {
  const location = useLocation();
  const activeRoute = routes.find((route) =>
    route.id === 'home'
      ? location.pathname === '/'
      : location.pathname.startsWith(route.to),
  );

  const handleRefresh = () => {
    // 단순히 현재 페이지 데이터를 다시 불러오기 위해 새로고침
    window.location.reload();
  };

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__logo">FlowBoard</span>
          <p>팀 전반을 한 눈에 확인하세요</p>
        </div>
        <div className="sidebar__nav">
          {routes.map((item) => {
            const isActive =
              item.id === 'home'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.id}
                to={item.to}
                className={isActive ? 'sidebar__link is-active' : 'sidebar__link'}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>
      <div className="app-shell__main">
        <header className="app-header">
          <div>
            <p className="app-header__eyebrow">Workspace overview</p>
            <h1 className="app-header__title">{activeRoute?.label ?? 'Dashboard'}</h1>
          </div>
          <div className="app-header__actions">
            <input
              className="app-header__search"
              type="search"
              placeholder="검색으로 빠르게 찾아보세요"
            />
            <button type="button" className="ghost-button" onClick={handleRefresh}>
              새로 고침
            </button>
          </div>
        </header>
        <section className="app-content">
          <Outlet />
        </section>
      </div>
      <RightSidePanel />
    </div>
  );
};

export default Layout;
