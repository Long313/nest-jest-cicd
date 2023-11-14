import {
  Controller,
} from '@nestjs/common';

@Controller('api')
export class AppController {
  // constructor(
  //   private readonly appService: AppService,
  //   private jwtService: JwtService,
  // ) {}
  // @Post('register')
  // async register(@Body() createUserDto: RegisterUserDto) {
  //   const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
  //   const user = await this.appService.create({
  //     userName: createUserDto.userName,
  //     email: createUserDto.email,
  //     password: hashedPassword,
  //     language: createUserDto.language,
  //   });
  //   delete user.password;
  //   return user;
  // }
  // @Post('login')
  // async login(
  //   @Body() createUserDto: LoginUserDto,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   const user = await this.appService.findOne(createUserDto.email);
  //   if (!user) {
  //     throw new BadRequestException('invalid credentials');
  //   }
  //   if (!(await bcrypt.compare(createUserDto.password, user.password))) {
  //     throw new BadRequestException('invalid credentials');
  //   }
  //   const jwt = await this.jwtService.signAsync({ id: user.id });
  //   response.cookie('jwt', jwt, { httpOnly: true });
  //   return {
  //     message: 'success',
  //   };
  // }
  // @Get('user')
  // async user(@Req() request: Request) {
  //   try {
  //     const cookie = request.cookies['jwt'];
  //     const data = await this.jwtService.verifyAsync(cookie);
  //     if (!data) {
  //       throw new UnauthorizedException();
  //     }
  //     console.log('dataId', data.id);
  //     const user = await this.appService.findOneId(data.id);
  //     const { password, ...userInfor } = user;
  //     return userInfor;
  //   } catch (err) {
  //     throw new UnauthorizedException();
  //   }
  // }
  // @Post('logout')
  // async logout(@Res({ passthrough: true }) response: Response) {
  //   response.clearCookie('jwt');
  //   return {
  //     message: 'success',
  //   };
  // }
}
