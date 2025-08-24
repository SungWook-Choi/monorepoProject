import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

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

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const email = profile.emails?.[0]?.value || profile._json?.email;
    const user = {
      provider: 'google',
      providerId: profile.id,
      email,
      name: profile.displayName,
      picture: profile.photos?.[0]?.value,
    };
    done(null, user);
  }
}
