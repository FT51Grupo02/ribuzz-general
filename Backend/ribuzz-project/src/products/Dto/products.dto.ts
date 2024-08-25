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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories: CategoryDto[];
}

export class UpdateProductDto extends CreateProductDto {
    @IsOptional()
    @IsUUID()
    id?: string;
  }