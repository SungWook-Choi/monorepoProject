import {isStrongPassword} from './utils/validators.ts';
import type {SignupModalProps} from './type/signup.ts';
import {useSignupModal} from './hooks/useSignupModal.ts';
import './style/signupModal.css';

const SignupModal = ({isOpen, onClose, defaultEmail}: SignupModalProps) => {
    const {
        form,
        feedback,
        error,
        liveErrors,
        isSubmitting,
        handleClose,
        handleSubmit,
        updateField,
    } = useSignupModal({isOpen, onClose, defaultEmail});

    if (!isOpen) return null;

    return (
        <div className="signup-modal__backdrop" role="dialog" aria-modal="true">
            <div className="signup-modal">
                <div className="signup-modal__header">
                    <div>
                        <p className="page-card__eyebrow">신규 계정 만들기</p>
                        <h3>몇 가지 정보만 입력하면 바로 시작할 수 있어요</h3>
                        <p className="signup-modal__hint">
                            현재 인증은 Google OAuth가 기본이지만, 로컬 계정 가입 요청도 사전 등록할 수 있습니다.
                        </p>
                    </div>
                    <button className="ghost-button" type="button" onClick={handleClose}>
                        닫기
                    </button>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <label className="signup-label">
                        이름
                        <input
                            type="text"
                            className="signup-input"
                            placeholder="홍길동"
                            value={form.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            required
                        />
                    </label>
                    <label className="signup-label">
                        이메일
                        <input
                            type="email"
                            className="signup-input"
                            placeholder="name@company.com"
                            value={form.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            required
                        />
                    </label>
                    <div className="signup-grid">
                        <label className="signup-label">
                            비밀번호
                            <input
                                type="password"
                                className="signup-input"
                                placeholder="8자 이상 영문, 숫자 포함"
                                value={form.password}
                                onChange={(e) => updateField('password', e.target.value)}
                                required
                            />
                        </label>
                        <label className="signup-label">
                            비밀번호 확인
                            <input
                                type="password"
                                className="signup-input"
                                placeholder="다시 입력"
                                value={form.confirmPassword}
                                onChange={(e) => updateField('confirmPassword', e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div className="password-meter">
                        <div className={`password-meter__bar ${form.password.length >= 8 ? 'is-active' : ''}`} />
                        <div className={`password-meter__bar ${isStrongPassword(form.password) ? 'is-active' : ''}`} />
                        <span className="password-meter__text">영문+숫자 포함 8자 이상 권장</span>
                    </div>

                    <label className="signup-consent">
                        <input
                            type="checkbox"
                            checked={form.acceptTerms}
                            onChange={(e) => updateField('acceptTerms', e.target.checked)}
                        />
                        <span>서비스 약관 및 개인정보 처리방침에 동의합니다.</span>
                    </label>

                    {error && <p className="signup-message signup-message--error">{error}</p>}
                    {feedback && <p className="signup-message signup-message--success">{feedback}</p>}
                    {!feedback && !error && liveErrors.length > 0 && (
                        <p className="signup-message signup-message--warn">{liveErrors[0]}</p>
                    )}

                    <div className="signup-actions">
                        <button type="button" className="ghost-button" onClick={handleClose} disabled={isSubmitting}>
                            취소
                        </button>
                        <button type="submit" className="login-submit" disabled={isSubmitting}>
                            {isSubmitting ? '처리 중...' : '회원가입 요청'}
                        </button>
                    </div>

                    <p className="signup-footnote">
                        제출하면 담당자가 계정을 승인하거나, 로컬 로그인 API가 준비되는 즉시 활성화됩니다. Google
                        OAuth 계정은 계속 사용할 수 있습니다.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;
