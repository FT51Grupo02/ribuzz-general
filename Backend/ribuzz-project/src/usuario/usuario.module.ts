/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Users } from '../Entidades/user.entity';
import { Events } from 'src/Entidades/events.entity';
import { Orders } from 'src/Entidades/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Events, Orders])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
