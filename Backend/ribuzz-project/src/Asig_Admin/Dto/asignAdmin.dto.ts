/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString } from "class-validator";

export class asignAdminDto {

    @IsEmail()
    email:string;

    @IsString()
    @IsOptional()
    rol?:string
}