import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import 'reflect-metadata';
const cors = require('cors')

async function bootstrap() {
  require('dotenv').config();
  
  const app = await NestFactory.create(AppModule);

  const whitList = ['http://localhost:3001/', 'https://ribuzz.vercel.app/', process.env.CORS_ORIGIN]

  app.use(cors({origin: whitList}))

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();