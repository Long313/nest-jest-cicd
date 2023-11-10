import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/request/UserLoginDto';
import { UserDto } from '../user/dto/user.dto';
import { validateHash } from 'src/common/utils';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { TokenType } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from 'src/shared/services';


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
    userId: string
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
        expiresIn: this.configService.authConfig.jwtExpirationTime,
        accessToken: await this.jwtService.signAsync({
            userId: data.userId,
            type: TokenType.ACCESS_TOKEN,
            role: data.role
        })
    })
  }
}
