import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, IsUUID, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

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
  [x: string]: any;
  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @IsString()
  date:string

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