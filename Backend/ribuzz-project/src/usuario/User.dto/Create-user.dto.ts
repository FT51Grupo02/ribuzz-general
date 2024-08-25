/* eslint-disable prettier/prettier */
import { PickType } from "@nestjs/mapped-types/dist";

/* eslint-disable prettier/prettier */
export class CreateUserDto {
    nombre: string;
    correo: string;
    contraseña: string;
    fecha: Date;
    rol?: string;
}

export class LoginUserDto extends PickType(CreateUserDto,[
    'correo',
    'contraseña'
]){}