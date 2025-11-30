import {Link, Outlet, useLocation} from 'react-router-dom';
import {appRoutes} from './routes/route.tsx';
import RightSidePanel from './component/RightSidePannel.tsx';
import {useAuth} from './hooks/auth/useAuth.ts';

const Layout = () => {
  const location = useLocation();
  const {user, logout, isLoggingOut} = useAuth();
  const activeRoute = appRoutes.find((route) =>
    location.pathname.startsWith(route.to),
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
          {appRoutes.map((item) => {
            const isActive = location.pathname.startsWith(item.to);

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
            {user && (
              <div className="app-header__profile">
                <div className="profile__info">
                  <span className="profile__name">{user.name ?? '로그인 사용자'}</span>
                  <span className="profile__email">{user.email ?? user.provider}</span>
                  {user.lastLoginAt && (
                    <span className="profile__meta">
                      최근 로그인: {new Date(user.lastLoginAt).toLocaleString()}
                    </span>
                  )}
                </div>
                <button type="button" className="ghost-button" onClick={() => logout()} disabled={isLoggingOut}>
                  로그아웃
                </button>
              </div>
            )}
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
