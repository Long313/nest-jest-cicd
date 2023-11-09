import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { UserRegisterDto } from './dto/request/UserRegisterDto';
import { UserService } from '../users/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async useRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
    try {
      const data = await this.userService.createUser(userRegisterDto);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
