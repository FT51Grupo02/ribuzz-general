/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterController } from './filters.controller';
import { FilterService } from './filters.service';
import { Products } from 'src/Entidades/products.entity';
import { Services } from 'src/Entidades/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Services])],
  controllers: [FilterController],
  providers: [FilterService],
  //exports:[FilterService]
})
export class FilterModule {}
