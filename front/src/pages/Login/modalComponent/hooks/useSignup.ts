import {useMutation} from '@tanstack/react-query';
import {PostAxios} from '../../../../common/api/apis.ts';
import type {SignupFormValues, SignupResponse} from '../type/signup.ts';
import {collectSignupErrors, toSignupRequest} from '../utils/validators.ts';

type SignupFeedback =
    | {kind: 'success'; message: string}
    | {kind: 'error'; message: string}
    | null;

const requestSignup = (payload: SignupFormValues) => {
    const body = toSignupRequest(payload);
    return PostAxios<SignupResponse, typeof body>('/auth/signup', body);
};

export const useSignup = () => {
    const mutation = useMutation({
        mutationFn: requestSignup,
    });

    const submit = async (form: SignupFormValues): Promise<SignupFeedback> => {
        const errors = collectSignupErrors(form);
        if (errors.length) {
            return {kind: 'error', message: errors[0]};
        }

        try {
            const res = await mutation.mutateAsync(form);
            if (res?.ok) {
                return {kind: 'success', message: res.message ?? '회원가입 요청이 완료되었습니다.'};
            }
            return {kind: 'error', message: res?.message ?? '회원가입 요청이 완료되지 않았습니다.'};
        } catch (error) {
            let message = error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.';
            if (message.toLowerCase().includes('404')) {
                message = '회원가입 API가 아직 준비되지 않았습니다. 백엔드에 /auth/signup을 추가해주세요.';
            }
            return {kind: 'error', message};
        }
    };

    return {
        submit,
        isSubmitting: mutation.isPending,
    };
};
