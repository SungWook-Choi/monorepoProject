export type SignupFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
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
