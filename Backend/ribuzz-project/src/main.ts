/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import 'reflect-metadata';

async function bootstrap() {
  require('dotenv').config();

  const app = await NestFactory.create(AppModule);

  const whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3005',
    'https://ribuzz.vercel.app',
    'http://localhost:4000',
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

// swagger
  const config = new DocumentBuilder()
    .setTitle('Ribuzz-Backend')
    .setDescription('Creacion de rutas y solicitudes en el backend para el manejo de la pagina Web Ribuzz')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Ribuzz')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();