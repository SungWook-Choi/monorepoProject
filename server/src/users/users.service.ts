import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginEntity, UserEntity } from './dto/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  // async selectLoginInfo(): Promise<LoginEntity> {
  //   return this.loginRepository.find({
  //     select: ['UserID', 'BlockCnt', 'IsBlock'],
  //   });
  // }
}
