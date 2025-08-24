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
    const jwt = await this.authService.issueJwt((req as any).user);
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
