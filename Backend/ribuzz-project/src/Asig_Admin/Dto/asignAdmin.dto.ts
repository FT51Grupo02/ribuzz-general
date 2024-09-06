/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class asignAdminDto {
    @IsString()
    rol?:string
}