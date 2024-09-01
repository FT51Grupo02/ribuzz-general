/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterController } from './filters.controller';
import { FilterService } from './filters.service';
import { Products } from 'src/Entidades/products.entity';
import { Services } from 'src/Entidades/services.entity';
import { Events } from 'src/Entidades/events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Services, Events])],
  controllers: [FilterController],
  providers: [FilterService],
  //exports:[FilterService]
})
export class FilterModule {}
