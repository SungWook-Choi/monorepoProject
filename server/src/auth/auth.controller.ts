import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import * as process from 'node:process';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google')) //passport 에서 지원한 AuthGuard type은 google
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    // 1) 구글에서 넘겨준 사용자 정보를 DB에 반영하고 내부 사용자 정보를 확보
    const savedUser = await this.authService.handleGoogleLogin(
      (req as any).user,
    );
    // 2) DB 사용자 기준으로 JWT를 재발급해 쿠키에 저장
    const jwt = await this.authService.issueJwt(savedUser);
    res.cookie('access_token', jwt, {
      httpOnly: true,
      sameSite: 'lax', // 프론트/백엔드 도메인이 다르면 'none' + secure:true
      secure: false, // 프로덕션(HTTPS)에서는 true
      domain: process.env.COOKIE_DOMAIN, // 다도메인 운영 시 설정
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    });
    // 로그인 후 프론트로 이동
    res.redirect(`${process.env.FRONT_URL}`);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: Request) {
    return req.user; // 프론트는 쿠키로 인증됨
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token', { path: '/' });
    res.send({ ok: true });
  }
}
