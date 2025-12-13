import type {SignupFormValues, SignupRequestBody} from '../type/signup.ts';

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isStrongPassword = (password: string) => {
    const hasLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLength && hasLetter && hasNumber;
};

export const collectSignupErrors = (form: SignupFormValues): string[] => {
    const errors: string[] = [];
    if (!form.name.trim()) errors.push('이름을 입력하세요.');
    if (!isValidEmail(form.email)) errors.push('올바른 이메일 주소를 입력하세요.');
    if (!isStrongPassword(form.password))
        errors.push('비밀번호는 8자 이상이며 영문과 숫자를 포함해야 합니다.');
    if (form.password !== form.confirmPassword) errors.push('비밀번호가 일치하지 않습니다.');
    if (!form.acceptTerms) errors.push('약관 및 개인정보 처리에 동의해야 가입할 수 있습니다.');
    return errors;
};

export const toSignupRequest = (form: SignupFormValues): SignupRequestBody => ({
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    password: form.password,
});
