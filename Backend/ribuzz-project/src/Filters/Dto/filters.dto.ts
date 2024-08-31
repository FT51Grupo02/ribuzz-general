/* eslint-disable prettier/prettier */
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterDto{
    @IsOptional()
    @IsString()
    name:string;
    
    @IsOptional()
    @IsString()
    categorie:string;

    @IsOptional()
    @IsNumber()
    price:number

    @IsOptional()
    @IsNumber()
    rating:number

    @IsOptional()
    @IsDate()
    publicationDate:Date

    @IsOptional()
    populate:string

    @IsOptional()
    location:string

    @IsOptional()
    @IsString()
    duration:string;

    @IsOptional()
    orderPrice: 'ASC' | 'DESC'
}