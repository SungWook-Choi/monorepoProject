export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthUser {
    id: number;
    email?: string;
    name?: string;
    provider: string;
    picture?: string | null;
    lastLoginAt?: string | null;
}
