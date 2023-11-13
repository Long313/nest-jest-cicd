import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // Thay đổi thành nguồn của ứng dụng của bạn
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Nếu bạn sử dụng phiên đăng nhập và cần truy cập cookie
  });
  const options = new DocumentBuilder()
    .setTitle('Galaxy Backend')
    .setDescription('Galaxy Backend Description')
    .setVersion('1.0')
    .addTag('List API')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(8000);
}
bootstrap();
