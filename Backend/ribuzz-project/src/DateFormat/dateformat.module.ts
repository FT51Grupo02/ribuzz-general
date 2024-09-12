/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DateFormatService } from './dateformat.service';

@Module({
  providers: [DateFormatService],
  exports: [DateFormatService], // Exporta el servicio para que pueda ser usado en otros módulos
})
export class DateFormatModule {}