/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Users } from '../Entidades/user.entity';
//import { Events } from 'src/Entidades/events.entity';
import { Orders } from 'src/Entidades/orders.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Orders]), SharedModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}