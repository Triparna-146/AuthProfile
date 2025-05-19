// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { graphqlUploadExpress } from 'graphql-upload';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,              // Allow sending cookies
  });

  await app.listen(4000); // or 3001, any port you chose
}
bootstrap();
