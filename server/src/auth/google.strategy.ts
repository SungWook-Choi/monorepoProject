import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import type { GoogleAuthProfile } from './auth.types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private cs: ConfigService) {
    super({
      clientID: cs.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: cs.getOrThrow<string>('GOOGLE_SECRET'),
      callbackURL: cs.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
      passReqToCallback: false,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): GoogleAuthProfile {
    const emailFromProfile = profile.emails?.[0]?.value;
    const emailFromJson =
      typeof profile._json === 'object' && profile._json !== null
        ? (profile._json as { email?: string }).email
        : undefined;

    return {
      provider: 'google',
      providerId: profile.id,
      email: emailFromProfile ?? emailFromJson,
      name: profile.displayName,
      picture: profile.photos?.[0]?.value,
    };
  }
}
