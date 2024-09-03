/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import 'reflect-metadata';
import cors, { CorsOptions } from 'cors';

dotenv.config();


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'https://ribuzz.vercel.app',
    'http://localhost:3001'
  ];
  
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
  };
  

  app.use(cors(corsOptions));
  app.enableCors(corsOptions);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
