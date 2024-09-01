/* eslint-disable prettier/prettier */
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Events } from "src/Entidades/events.entity";
import { Services } from "src/Entidades/services.entity";
import { Products } from "../../Entidades/products.entity";


export class CreateOrderDto{
    @IsNotEmpty()
    @IsUUID()
    userId:string;

    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Products[]>
    
    @IsArray()
    @ArrayMinSize(1)
    service: Partial<Services[]>

    @IsArray()
    @ArrayMinSize(1)
    events: Partial<Events[]>


}