import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { users } from 'src/Entities/user.entity';
import { UsersRepository } from 'src/Users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([users])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, UsersRepository],
})
export class AuthModule {}
