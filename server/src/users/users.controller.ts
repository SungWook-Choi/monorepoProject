import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): string {
    return 'test users';
  }

  @Get('googleAuth')
  getGoogleAuth() {
    return 'test user google';
  }

  @Get('test')
  setTest() {
    return 'temp';
  }
}
