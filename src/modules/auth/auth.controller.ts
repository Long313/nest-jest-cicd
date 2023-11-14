import { Controller } from '@nestjs/common';
import { Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../user/dto/user.dto';
import { UserRegisterDto } from '../../modules/auth/dto/request/UserRegisterDto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/request/UserLoginDto';
import { LoginPayloadDto } from './dto/request/LoginPayloadDto';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private readonly userRepository: Repository<User>,
  ) {}
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserDto,
    description: 'Successfully Registered',
  })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
    try {
      const data = await this.userService.createUser(userRegisterDto);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);
    const token = await this.authService.createAccessToken({
      userId: userEntity.id || '',
      role: userEntity.role,
    });
    const refreshToken = await this.authService.createRefreshToken({
      userId: userEntity.id || '',
      role: userEntity.role,
    });
    return new LoginPayloadDto(userEntity, token, refreshToken);
  }
}
