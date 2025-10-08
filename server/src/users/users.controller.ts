import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginInfo, UserInfo } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): { name: string } {
    return { name: 'test users' };
  }

  @Get('googleAuth')
  getGoogleAuth() {
    return 'test user google';
  }

  @Get('test')
  setTest() {
    return 'temp';
  }

  @Get('info')
  getInfo(): UserInfo[] {
    return [
      {
        name: 'User1',
        email: 'test1@test.com',
        loginID: 'user1@test.com',
        userID: '1',
      },
    ];
  }

  @Get('userList')
  list() {
    return this.usersService.findAll();
  }

  @Get('loginInfo')
  loginInfo(): loginInfo {}
}
