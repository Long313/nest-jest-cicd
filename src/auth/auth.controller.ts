import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() data) {
    return {
      message: 'Đăng ký thành công',
      data: data,
    };
  }
}
