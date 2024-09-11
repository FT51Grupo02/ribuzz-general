/* eslint-disable prettier/prettier */
import { IsEmail } from "class-validator";

export class asignAdminDto {

    @IsEmail()
    email:string;

}