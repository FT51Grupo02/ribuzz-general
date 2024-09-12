/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, IsUUID, Min, IsUrl } from 'class-validator';
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

export class CreateServiceDto {

  @ApiProperty({
    description:'Poner el nombre del servicio'
  })
  @IsString()
  name:string

  [x: string]: any;
  @ApiProperty({
    description:'Describa el servicio brevemente',
    example:'El servicio consta de ofrecer asesoramiento para realizar paginas web'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description:'Poner el precio con dos cifras despues del punto',
    example: 90.33
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description:'Por favor poner numeros sin puntos ni comas',
    example:125
  })
  @IsNumber()
  @Min(0)
  stock: number;


  @ApiProperty({
    description:'Poner la URL de imagen',
    example: [
      "https://images.pexels.com/photos/3803863/pexels-photo-3803863.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1181705/pexels-photo-1181705.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
  })
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiProperty({
    description:'Poner la URL del video',
    example:["/videos/service-demo.mp4"]
  })
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailDto)
  details: DetailDto[];

  @ApiProperty({
    description:'Poner las categorias disponibles en un arreglo',
    example:['Hogar']
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories?: CategoryDto[];
}

export class UpdateServiceDto extends CreateServiceDto {
    @IsOptional()
    @IsUUID()
    id?: string;
  }