import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async handleGoogleLogin(googleUser: GoogleAuthProfile) {
    // 구글 계정 정보를 LoginEntity에 반영하고 JWT 발급에 필요한 최소 데이터를 반환
    const login = await this.usersService.syncGoogleLogin(googleUser);
    return {
      id: login.UserID,
      email: login.Email ?? undefined,
      name: login.DisplayName ?? googleUser.name,
      provider: login.ProviderType,
      picture: login.ProfileImageUrl ?? googleUser.picture,
    };
  }

  async issueJwt(user: AuthenticatedUser) {
    // JWT payload에 서비스에서 사용하는 기본 정보를 포함
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider,
    };
    return this.jwt.sign(payload);
  }
}

interface GoogleAuthProfile {
  provider: string;
  providerId: string;
  email?: string;
  name?: string;
  picture?: string;
}

interface AuthenticatedUser {
  id: number;
  email?: string;
  name?: string;
  provider: string;
  picture?: string | null;
}
