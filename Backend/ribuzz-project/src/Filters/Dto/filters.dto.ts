/* eslint-disable prettier/prettier */
import { IsDate, IsNumber, IsOptional, IsString, IsEnum } from "class-validator";

export class FilterDto {
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    @IsString()
    categories?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @IsDate()
    publicateDate?: Date;

    @IsOptional()
    @IsString()
    populate?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    duration?: string;

    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    orderPrice?: 'ASC' | 'DESC';

    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    orderRating?: 'ASC' | 'DESC';

    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    orderPopularity?: 'ASC' | 'DESC';
}