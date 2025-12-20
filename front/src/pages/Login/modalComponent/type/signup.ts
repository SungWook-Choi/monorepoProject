export type SignupFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
};

export type SignupModalProps = {
    isOpen: boolean;
    onClose: () => void;
    defaultEmail?: string;
};

export type SignupModalState = {
    form: SignupFormValues;
    feedback: string | null;
    error: string | null;
    liveErrors: string[];
    isSubmitting: boolean;
};

export type SignupRequestBody = {
    name: string;
    email: string;
    password: string;
};

export type SignupResponse = {
    ok: boolean;
    message?: string;
};
