import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async issueJwt(user: any) {
    const payload = {
      sub: user.id || user.providerId,
      email: user.email,
      name: user.name,
      provider: user.provider,
    };
    return this.jwt.sign(payload);
  }
}
