import type { Request } from 'express';

export interface GoogleAuthProfile {
  provider: 'google';
  providerId: string;
  email?: string;
  name?: string;
  picture?: string;
}

export interface AuthenticatedUser {
  id: number;
  email?: string;
  name?: string;
  provider: string;
  picture?: string | null;
}

export interface JwtPayload {
  sub: number;
  email?: string;
  name?: string;
  provider: string;
  picture?: string | null;
}

export type GoogleAuthRequest = Request & { user: GoogleAuthProfile };
export type JwtAuthRequest = Request & { user: JwtPayload };
