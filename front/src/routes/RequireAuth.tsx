import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth.ts';

const RequireAuth = () => {
    const location = useLocation();
    const {status, isLoading} = useAuth();

    if (isLoading) {
        return (
            <div className="page-section">
                <div className="page-card">
                    <p className="page-card__eyebrow">인증 확인 중</p>
                    <h2>세션을 확인하고 있습니다...</h2>
                    <p>잠시만 기다려주세요.</p>
                </div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return <Navigate to="/login" replace state={{from: location.pathname}} />;
    }

    return <Outlet />;
};

export default RequireAuth;
