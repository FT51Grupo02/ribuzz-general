/* eslint-disable prettier/prettier */
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterDto{
    
    @IsOptional()
    @IsString()
    categorie:string;

    @IsOptional()
    @IsNumber()
    price:number

    @IsOptional()
    @IsNumber()
    rate:number

    @IsOptional()
    @IsDate()
    publicationDate:Date

    @IsOptional()
    populate:string

    @IsOptional()
    location:string
}