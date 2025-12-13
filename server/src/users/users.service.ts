import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginEntity, UserEntity } from './dto/user.entity';
import { Repository } from 'typeorm';
import { loginInfo } from './dto/create-user.dto';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

interface GoogleProfilePayload {
  provider: string;
  providerId: string;
  email?: string;
  name?: string;
  picture?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,
  ) {}

  async findAll() {
    // 사용자 전체 목록을 그대로 노출하는 단순 조회 로직
    return this.usersRepository.find();
  }

  async syncGoogleLogin(
    googleUser: GoogleProfilePayload,
  ): Promise<LoginEntity> {
    // 구글 OAuth에서 넘어온 식별자를 우선 검색해 기존 사용자와 매칭
    let login = await this.loginRepository.findOne({
      where: {
        ProviderType: googleUser.provider,
        ProviderUserID: googleUser.providerId,
      },
    });

    // Provider 정보가 없으면 이메일 기준으로 한번 더 확인하여 중복 생성을 방지
    if (!login && googleUser.email) {
      login = await this.loginRepository.findOne({
        where: { Email: googleUser.email },
      });
    }

    // 기존 계정이 없다면 신규로 생성하면서 기본 상태값을 채움
    if (!login) {
      login = this.loginRepository.create({
        Email: googleUser.email ?? '',
        DisplayName: googleUser.name ?? null,
        ProviderType: googleUser.provider,
        ProviderUserID: googleUser.providerId,
        ProfileImageUrl: googleUser.picture ?? null,
        Password: '',
        BlockCnt: 0,
        IsBlock: 0,
        CreateUserID: 0,
      });
    } else {
      // 기존 계정과 매칭되면 최신 사용자 정보를 덮어써 연동 정보를 갱신
      login.Email = googleUser.email ?? login.Email ?? '';
      login.DisplayName = googleUser.name ?? login.DisplayName;
      login.ProviderType = googleUser.provider;
      login.ProviderUserID = googleUser.providerId;
      login.ProfileImageUrl = googleUser.picture ?? login.ProfileImageUrl;
    }

    // 시스템 계정으로 업데이트 기록을 남김
    login.UpdateUserID = 0;

    return this.loginRepository.save(login);
  }

  async createLocalLogin(params: {
    email: string;
    password: string;
    name: string;
  }): Promise<LoginEntity> {
    const email = params.email.trim().toLowerCase();
    if (!email || !params.password) {
      throw new BadRequestException('email and password are required');
    }

    // 동일 이메일로 로컬 계정이 이미 있으면 생성 차단
    const exists = await this.loginRepository.findOne({
      where: { Email: email, ProviderType: 'local' },
    });
    if (exists) {
      throw new ConflictException('email already exists');
    }

    const hashedPassword = this.hashPassword(params.password);

    const login = this.loginRepository.create({
      Email: email,
      DisplayName: params.name || null,
      ProviderType: 'local',
      ProviderUserID: null,
      ProfileImageUrl: null,
      Password: hashedPassword,
      BlockCnt: 0,
      IsBlock: 0,
      CreateUserID: 0,
      UpdateUserID: 0,
    });

    return this.loginRepository.save(login);
  }

  async verifyLocalLogin(
    email: string,
    password: string,
  ): Promise<LoginEntity> {
    const normalizedEmail = email.trim().toLowerCase();
    const login = await this.loginRepository.findOne({
      where: { Email: normalizedEmail, ProviderType: 'local' },
    });

    if (!login) {
      throw new UnauthorizedException('invalid credentials');
    }

    if (login.IsBlock === 1) {
      throw new UnauthorizedException('account is blocked');
    }

    // 저장된 해시와 입력 비밀번호 비교
    const isValid = this.verifyPassword(password, login.Password);
    if (!isValid) {
      throw new UnauthorizedException('invalid credentials');
    }

    return login;
  }

  async fetchLoginInfo(): Promise<loginInfo[]> {
    // 로그인 테이블의 차단 여부를 API 규격에 맞게 boolean으로 변환해 응답
    const rows = await this.loginRepository.find({
      select: ['UserID', 'BlockCnt', 'IsBlock'],
    });
    return rows.map((row) => ({
      UserID: row.UserID,
      BlockCnt: row.BlockCnt,
      IsBlock: row.IsBlock === 1,
    }));
  }

  private hashPassword(password: string): string {
    // scrypt + salt 기반 해싱 (salt:hash 형태로 저장)
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, stored: string): boolean {
    const [salt, hashed] = stored.split(':');
    if (!salt || !hashed) return false;
    const hashToCompare = scryptSync(password, salt, 64).toString('hex');
    return timingSafeEqual(
      Buffer.from(hashToCompare, 'hex'),
      Buffer.from(hashed, 'hex'),
    );
  }
}
