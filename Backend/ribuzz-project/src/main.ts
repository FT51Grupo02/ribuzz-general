/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import 'reflect-metadata';

async function bootstrap() {

  require('dotenv').config();

  const app = await NestFactory.create(AppModule);

  const whitelist = [
    'http://localhost:3001',
    'https://ribuzz.vercel.app',
    process.env.CORS_ORIGIN,
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();