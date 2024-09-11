/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/Entidades/user.entity";
import { giveAdminController } from "./asigAdmin.controller";
import { giveAdminService } from "./asigAdmin.service";
import { UsuarioService } from "src/usuario/usuario.service";
import { SharedModule } from "src/shared/shared.module";

@Module({
    imports: [TypeOrmModule.forFeature([Users]),SharedModule],
    controllers: [giveAdminController],
    providers: [giveAdminService, UsuarioService]
})

export class authAdminModule{}