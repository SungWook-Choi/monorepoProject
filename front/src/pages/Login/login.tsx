import SignupModal from './modalComponent/SignupModal.tsx';
import {useLogin} from './hooks/login/useLogin.ts';

const Login = () => {
    const {
        email,
        password,
        setEmail,
        setPassword,
        isSignupOpen,
        openSignup,
        closeSignup,
        loginFeedback,
        loginError,
        isSubmitting,
        isLoading,
        startGoogleLogin,
        handleEmailLogin,
        refreshProfile,
    } = useLogin();

    return (
        <section className="login-page">
            <div className="login-shell">
                <div className="login-hero">
                    <div className="login-hero__badge">재무 워크스페이스</div>
                    <h1>
                        하나의 계정으로
                        <br /> 데이터를 관리하세요
                    </h1>
                    <p>
                        실시간 가계부, 대시보드, 조직도까지. 안전하게 로그인하면 모든 기능을 바로
                        사용할 수 있습니다.
                    </p>
                    <div className="login-hero__cards">
                        <div className="login-hero__card">
                            <span>대시보드</span>
                            <strong>상태 한눈에 보기</strong>
                        </div>
                        <div className="login-hero__card">
                            <span>가계부</span>
                            <strong>지출·입금 관리</strong>
                        </div>
                        <div className="login-hero__card">
                            <span>조직도</span>
                            <strong>팀 구성 파악</strong>
                        </div>
                    </div>
                </div>

                <div className="login-panel">
                    <div className="login-panel__header">
                        <div>
                            <p className="page-card__eyebrow">보안 로그인</p>
                            <h2>회사 계정에 접속하세요</h2>
                            <p className="login-panel__subtext">
                                이메일 로그인 UI를 추가했습니다. 현재 인증은 Google OAuth를
                                사용합니다.
                            </p>
                        </div>
                    </div>

                    <form className="login-form" onSubmit={handleEmailLogin}>
                        <label className="login-label">
                            아이디(이메일)
                            <input
                                type="email"
                                className="login-input"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label className="login-label">
                            비밀번호
                            <input
                                type="password"
                                className="login-input"
                                placeholder="8자 이상 영문, 숫자 조합"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <div className="login-meta">
                            <label className="remember-check">
                                <input type="checkbox" />
                                로그인 상태 유지
                            </label>
                            <button
                                className="ghost-button"
                                type="button"
                                onClick={() => refreshProfile()}
                                disabled={isLoading || isSubmitting}
                            >
                                세션 다시 확인
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="login-submit"
                            disabled={isLoading || isSubmitting}
                        >
                            로그인
                        </button>
                    </form>
                    {(loginError || loginFeedback) && (
                        <p
                            className={`login-message ${loginError ? 'login-message--error' : 'login-message--success'}`}
                        >
                            {loginError ?? loginFeedback}
                        </p>
                    )}

                    <div className="login-divider">
                        <span>또는</span>
                    </div>

                    <button
                        className="google-button"
                        type="button"
                        onClick={startGoogleLogin}
                        disabled={isLoading || isSubmitting}
                    >
                        <span className="google-button__icon">G</span>
                        Google 계정으로 계속
                    </button>

                    <div className="signup-row">
                        <p>계정이 없으신가요?</p>
                        <button
                            className="ghost-button"
                            type="button"
                            onClick={openSignup}
                            disabled={isSubmitting}
                        >
                            회원가입
                        </button>
                    </div>

                    <p className="login-footer">
                        Google 인증이 완료되면 대시보드로 이동합니다. 이메일 로그인은 추후 사내
                        인증이 연동되면 활성화됩니다.
                    </p>
                </div>
            </div>
            <SignupModal isOpen={isSignupOpen} onClose={closeSignup} defaultEmail={email} />
        </section>
    );
};
export default Login;
