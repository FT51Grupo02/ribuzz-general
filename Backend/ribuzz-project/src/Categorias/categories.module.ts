/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.services';
import { CategoriesControl } from './categories.controller';
import { Categories } from 'src/Entidades/categories.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categories]), SharedModule],
  controllers: [CategoriesControl],
  providers: [CategoriesService],
})
export class CategoriesModule {}
