/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/Entidades/user.entity";
import { UsuarioService } from "src/usuario/usuario.service";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [AuthController],
    providers: [AuthService, UsuarioService],
  })
  export class AuthModule {}
  