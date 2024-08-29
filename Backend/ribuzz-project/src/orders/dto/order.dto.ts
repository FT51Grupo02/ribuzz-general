/* eslint-disable prettier/prettier */
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "../../Entidades/products.entity";


export class CreateOrderDto{
    @IsNotEmpty()
    @IsUUID()
    userId:string;

    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Products[]>
    
    // @IsArray()
    // @ArrayMinSize(1)
    // service: Partial<service[]>

}