import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginHistoryEntity } from './login-history.entity';
import { Repository } from 'typeorm';
import type { AuthenticatedUser, GoogleAuthProfile } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(LoginHistoryEntity)
    private readonly loginHistoryRepository: Repository<LoginHistoryEntity>,
  ) {}

  async handleGoogleLogin(
    googleUser: GoogleAuthProfile,
    userAgent?: string,
  ): Promise<AuthenticatedUser> {
    // 구글 계정 정보를 LoginEntity에 반영하고 JWT 발급에 필요한 최소 데이터를 반환
    const login = await this.usersService.syncGoogleLogin(googleUser);
    await this.recordLoginHistory({
      userId: login.UserID,
      provider: login.ProviderType,
      email: login.Email ?? undefined,
      userAgent,
    });
    return {
      id: login.UserID,
      email: login.Email ?? undefined,
      name: login.DisplayName ?? googleUser.name,
      provider: login.ProviderType,
      picture: login.ProfileImageUrl ?? googleUser.picture,
    };
  }

  issueJwt(user: AuthenticatedUser): string {
    // JWT payload에 서비스에서 사용하는 기본 정보를 포함
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider,
      picture: user.picture,
    };
    return this.jwt.sign(payload);
  }

  async recordLoginHistory(params: {
    userId: number;
    provider: string;
    email?: string;
    userAgent?: string | null;
  }) {
    const history = this.loginHistoryRepository.create({
      UserID: params.userId,
      ProviderType: params.provider,
      Email: params.email ?? null,
      UserAgent: params.userAgent ?? null,
    });
    return this.loginHistoryRepository.save(history);
  }

  async findLastLogin(userId: number) {
    return this.loginHistoryRepository.findOne({
      where: { UserID: userId },
      order: { LoginAt: 'DESC' },
    });
  }
}
