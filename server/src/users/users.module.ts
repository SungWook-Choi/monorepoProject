import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity, UserEntity } from './dto/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity, LoginEntity])],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
