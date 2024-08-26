import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/Entidades/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Services])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
