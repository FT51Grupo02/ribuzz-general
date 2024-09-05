/* eslint-disable prettier/prettier */
import { PickType } from "@nestjs/mapped-types/dist";
import { IsNotEmpty, IsString, IsIn } from "class-validator";


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    date: Date;
    
    @IsNotEmpty()
    @IsString()
    @IsIn(['cliente', 'emprendedor'])
    rol?: string;

    @IsString()
    photo?: string;


}

export class LoginUserDto extends PickType(CreateUserDto,[
    'email',
    'password'
]){}