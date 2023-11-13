import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/user.entity';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { ApiConfigService } from './shared/services';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { MY_SECRET_KEY } from './constants';
import { UnitModule } from './modules/unit/unit.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '@Long123',
      database: 'galaxydb',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || MY_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || '3600s' },
    }),
    AuthModule,
    UserModule,
    UnitModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    ConfigService,
    AppService,
    Repository,
    UserService,
    ApiConfigService,
    AuthService,
  ],
})
export class AppModule {}
