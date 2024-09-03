/* eslint-disable prettier/prettier */
//import { NestFactory } from '@nestjs/core';
//import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';


dotenv.config();


async function bootstrap() {
  
  const app = express()

  const allowedOrigins = [
    'https://ribuzz.vercel.app',
    'http://localhost:3001'
  ];
  
  const corsOptions = {
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


  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap()
