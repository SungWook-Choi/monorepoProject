import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import type {AuthStatus, AuthUser} from '../types/auth.ts';

type AuthState = {
    user: AuthUser | null;
    status: AuthStatus;
};

type AuthActions = {
    setUser: (user: AuthUser | null) => void;
    setStatus: (status: AuthStatus) => void;
};

const initialState: AuthState = {
    user: null,
    status: 'idle',
};

export const useAuthStore = create<AuthState & AuthActions>()(
    immer((set) => ({
        ...initialState,
        setUser: (user) =>
            set((state) => {
                state.user = user;
                state.status = user ? 'authenticated' : 'unauthenticated';
            }),
        setStatus: (status) =>
            set((state) => {
                state.status = status;
                if (status === 'unauthenticated') {
                    state.user = null;
                }
            }),
    })),
);
