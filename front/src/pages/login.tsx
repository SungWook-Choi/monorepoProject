import axios from 'axios';
import useSampleAPIs from '../hooks/useSampleAPIs';

const Login = () => {
    const { data } = useSampleAPIs();
    console.log(data);
    const onClick = () => {
        window.location.href = 'http://localhost:4000/auth/google';
    };
    return (
        <section className="page-section">
            <div className="page-card">
                <div className="page-card__header">
                    <div>
                        <p className="page-card__eyebrow">빠른 로그인</p>
                        <h2>Google 계정으로 로그인</h2>
                    </div>
                    <span className="status-chip">SSO</span>
                </div>
                <p>Google 인증으로 안전하고 빠르게 접속할 수 있습니다.</p>
                <div className="button-row">
                    <button
                        onClick={async () => {
                            const url: string = 'http://localhost:4000/users/googleAuth';
                            const res = await axios.get<null>(url);
                            console.log(res);
                        }}
                    >
                        백엔드 연결 테스트
                    </button>
                    <button className="ghost-button" onClick={onClick}>
                        구글 인증 실행
                    </button>
                </div>
            </div>
        </section>
    );
};
export default Login;
