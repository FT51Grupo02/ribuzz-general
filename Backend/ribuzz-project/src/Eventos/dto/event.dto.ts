/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class SellerInfoDto {
  @IsString()
  name: string;

  @IsString()
  contact: string;
}

class ReviewDto {
  @IsString()
  user: string;

  @IsNumber()
  @Min(0)
  rating: number;

  @IsString()
  comment: string;
}



export class CreateEventDto {

  @ApiProperty({
    description:'Nombre del evento',
  })
  @IsString()
  name: string;

  [x: string]: any;
  @ApiProperty({
    description:'Describa el evento brevemente',
    example: 'Este evento es de tecnología'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description:'Por favor ponga el precio con dos cifras despues del punto',
    example: 90.00
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description:'La cifra debe tener un numero sin puntos ni comas',
    example:30
  })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'por favor poner la URL de la imagen',
    example: [
		"https://images.pexels.com/photos/3803863/pexels-photo-3803863.jpeg?auto=compress&cs=tinysrgb&w=600",
		"https://images.pexels.com/photos/1181705/pexels-photo-1181705.jpeg?auto=compress&cs=tinysrgb&w=600",
	],})
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiProperty({
    description:'Por faor ponerlo en el formato AAAA-MM-DD',
    example:'2024-05-10'
  })
  @IsString()
  date:string

  @ApiProperty({
    description:'Poner la ciudad y el país separados con una coma',
    example:'Bogotá,Colombia'
  })   
  @IsString()
  location:string

  @IsOptional()
  @ValidateNested()
  @Type(() => SellerInfoDto)
  sellerInfo?: SellerInfoDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviews?: ReviewDto[];



//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CategoryDto)
//   categories: CategoryDto[];
}