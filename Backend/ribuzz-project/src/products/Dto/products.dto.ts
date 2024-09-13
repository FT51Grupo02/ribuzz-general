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

class DetailDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

class CategoryDto {
  @IsString()
  name: string;
}

export class CreateProductDto {

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Bicicleta Rural XT',
})
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Imágenes del producto',
        example: [
            'https://images.pexels.com/photos/1648566/pexels-photo-1648566.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/2629277/pexels-photo-2629277.jpeg?auto=compress&cs=tinysrgb&w=600',
        ],
        type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];


  @ApiProperty({
    description: 'Descripción del producto',
    example:'Es un producto extraordinario'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description:'Introduzca un numero terminado con dos decimas despues del punto',
    example: 190.90
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description:'Introduzca un numero sin puntos ni cifras extras',
    example: 15
  })
  @IsNumber()
  @Min(0)
  stock: number;


  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  videos?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SellerInfoDto)
  sellerInfo?: SellerInfoDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  customizationOptions?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviews?: ReviewDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailDto)
  details?: DetailDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories: CategoryDto[];
}

export class upDateProduct extends CreateProductDto{
  
    @IsString()
    name:string

    @IsNumber()
    stock:number

    @IsNumber()
    price:number

    @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories: CategoryDto[];

}