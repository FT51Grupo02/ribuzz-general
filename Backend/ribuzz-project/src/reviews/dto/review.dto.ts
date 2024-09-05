import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min } from "class-validator";


export class CreateReviewDto {

    @IsNotEmpty()
    @IsUUID()
    userId:string;

    @IsNotEmpty()
    @IsUUID()
    productsId: string;

    @IsString()
    username: string;
  
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;
  
    @IsString()
    comment: string;
  }