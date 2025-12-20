import {useCallback, useEffect, useState, type FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {PostAxios} from '../../../../common/api/apis.ts';
import {useAuth} from '../../../../hooks/auth/useAuth.ts';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [loginFeedback, setLoginFeedback] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const {loginUrl, status, isLoading, refreshProfile} = useAuth();

    useEffect(() => {
        if (status === 'authenticated') {
            navigate('/dashboard', {replace: true});
        }
    }, [navigate, status]);

    const startGoogleLogin = useCallback(() => {
        if (!loginUrl) return;
        // location.assign을 사용해 새 요청을 보내 세션 쿠키를 정상적으로 받도록 한다.
        window.location.assign(loginUrl);
    }, [loginUrl]);

    const handleEmailLogin = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // 새로 추가된 로컬 로그인 API로 이메일/비밀번호 로그인 요청
            setLoginFeedback(null);
            setLoginError(null);
            setIsSubmitting(true);

            PostAxios<{ ok: boolean; message?: string }, { email: string; password: string }>('/auth/login', {
                email,
                password,
            })
                .then((res) => {
                    if (res?.ok) {
                        setLoginFeedback(res.message ?? '로그인 완료! 대시보드로 이동합니다.');
                        refreshProfile();
                    } else {
                        setLoginError(res?.message ?? '로그인에 실패했습니다.');
                    }
                })
                .catch((error) => {
                    const message = error instanceof Error ? error.message : '로그인 요청 중 오류가 발생했습니다.';
                    setLoginError(message);
                })
                .finally(() => setIsSubmitting(false));
        },
        [email, password, refreshProfile],
    );

    return {
        email,
        password,
        setEmail,
        setPassword,
        isSignupOpen,
        openSignup: () => setIsSignupOpen(true),
        closeSignup: () => setIsSignupOpen(false),
        loginFeedback,
        loginError,
        isSubmitting,
        isLoading,
        status,
        startGoogleLogin,
        handleEmailLogin,
        refreshProfile,
    };
};
