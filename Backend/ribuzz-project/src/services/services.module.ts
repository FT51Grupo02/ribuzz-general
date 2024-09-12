/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/Entidades/services.entity';
import { Categories } from 'src/Entidades/categories.entity';
import { SharedModule } from 'src/shared/shared.module';
import { DateFormatModule } from 'src/DateFormat/dateformat.module';

@Module({
  imports: [TypeOrmModule.forFeature([Services, Categories]), DateFormatModule,SharedModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
