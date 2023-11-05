import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('login')
@ApiTags('') // Đánh dấu tag cho controller
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getCat')
  @ApiOperation({ summary: '' })
  getHello(): string {
    return this.appService.getHello();
  }
}
