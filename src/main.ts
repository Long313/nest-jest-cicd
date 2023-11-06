import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
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
