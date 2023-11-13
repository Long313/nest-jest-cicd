import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserController } from '../user/user.controller';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from 'src/shared/services';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController, UserController],
  providers: [
    ConfigService,
    AuthService,
    ApiConfigService,
    UserService,
    JwtService,
  ],
})
export class AuthModule {}
