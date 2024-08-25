/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.services';
import { CategoriesControl } from './categories.controller';
import { Categories } from 'src/Entidades/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesControl],
  providers: [CategoriesService],
})
export class CategoriesModule {}
