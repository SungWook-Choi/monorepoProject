import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth.ts';

const Login = () => {
    const navigate = useNavigate();
    const {loginUrl, status, isLoading, refreshProfile} = useAuth();

    useEffect(() => {
        if (status === 'authenticated') {
            navigate('/dashboard', {replace: true});
        }
    }, [navigate, status]);

    const startGoogleLogin = () => {
        window.location.href = loginUrl;
    };

    return (
        <section className="page-section">
            <div className="page-card">
                <div className="page-card__header">
                    <div>
                        <p className="page-card__eyebrow">첫 단계</p>
                        <h2>로그인 후 메인으로 이동합니다</h2>
                    </div>
                    <span className="status-chip">필수</span>
                </div>
                <p>Google OAuth 인증을 완료하면 대시보드와 가계부 기능을 이용할 수 있습니다.</p>
                <div className="button-row">
                    <button onClick={startGoogleLogin} disabled={isLoading}>
                        구글 인증으로 로그인
                    </button>
                    <button className="ghost-button" onClick={() => refreshProfile()} disabled={isLoading}>
                        세션 다시 확인
                    </button>
                </div>
            </div>
        </section>
    );
};
export default Login;
