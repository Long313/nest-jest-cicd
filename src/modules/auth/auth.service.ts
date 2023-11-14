import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/request/UserLoginDto';
import { UserDto } from '../user/dto/user.dto';
import { validateHash } from '../common/utils';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { TokenType } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from 'src/shared/services';
import { RefreshTokenPayloadDto } from './dto/RefreshTokenPayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ApiConfigService,
  ) {}
  async validateUser(userLoginDto: UserLoginDto): Promise<UserDto> {
    const user = await this.userService.findUserByEmail(userLoginDto.email);
    let isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );
    if (!user || !isPasswordValid) {
      throw new UserNotFoundException('The password or email is incorrect');
    } else {
      return new UserDto(user);
    }
  }

  async createAccessToken(data: {
    role: string;
    userId: string | number;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async createRefreshToken(data: {
    role: string;
    userId: string | number;
  }): Promise<RefreshTokenPayloadDto> {
    try {
      const refreshToken = await this.jwtService.signAsync(
        {
          userId: data.userId,
          type: TokenType.ACCESS_TOKEN,
          role: data.role,
        },
        {
          expiresIn: '30 days',
          secret: this.configService.authConfig.secret,
        },
      );
      console.log('refreshToken', refreshToken);
      await this.userService.updateRefreshToken(data.userId, false);
      return new RefreshTokenPayloadDto({
        expiresIn: 60 * 60 * 24 * 30,
        refreshToken,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  // private mapUserToUpdateResult(user: any): {
  //   expiresIn: number;
  //   refreshToken: string;
  // } {
  // Implement the logic to extract expiresIn and refreshToken from the user object
  // and return the { expiresIn: number; refreshToken: string; } object.
  // This depends on the structure of your user object returned by updateRefreshToken.
  //   return {
  //     expiresIn: user.expiresIn,
  //     refreshToken: user.refreshToken,
  //   };
  // }
}
