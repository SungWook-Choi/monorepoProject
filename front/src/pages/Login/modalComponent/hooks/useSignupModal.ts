import {useEffect, useMemo, useState, type FormEvent} from 'react';
import {useSignup} from './useSignup.ts';
import {collectSignupErrors} from '../utils/validators.ts';
import type {SignupFormValues, SignupModalProps} from '../type/signup.ts';

const initialForm: SignupFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
};

export const useSignupModal = ({isOpen, onClose, defaultEmail}: SignupModalProps) => {
    const [form, setForm] = useState<SignupFormValues>(initialForm);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const {submit, isSubmitting} = useSignup();

    useEffect(() => {
        if (isOpen) {
            setForm((prev) => ({
                ...prev,
                email: defaultEmail ?? prev.email,
            }));
            setFeedback(null);
            setError(null);
        }
    }, [defaultEmail, isOpen]);

    const liveErrors = useMemo(() => collectSignupErrors(form), [form]);

    const handleClose = () => {
        setForm(initialForm);
        setFeedback(null);
        setError(null);
        onClose();
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setFeedback(null);

        const result = await submit(form);
        if (result?.kind === 'success') {
            setFeedback(result.message);
            setTimeout(() => {
                handleClose();
            }, 1200);
        } else if (result?.kind === 'error') {
            setError(result.message);
        }
    };

    const updateField = <K extends keyof SignupFormValues>(key: K, value: SignupFormValues[K]) => {
        setForm((prev) => ({...prev, [key]: value}));
    };

    return {
        form,
        feedback,
        error,
        liveErrors,
        isSubmitting,
        handleClose,
        handleSubmit,
        updateField,
    };
};
