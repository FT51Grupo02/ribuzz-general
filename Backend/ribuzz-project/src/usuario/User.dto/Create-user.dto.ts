/* eslint-disable prettier/prettier */
import { PickType } from "@nestjs/mapped-types/dist";

/* eslint-disable prettier/prettier */
export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    date: Date;
    rol?: string;
}

export class LoginUserDto extends PickType(CreateUserDto,[
    'email',
    'password'
]){}