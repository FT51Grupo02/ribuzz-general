import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; 
// import { Categories } from "../Entidades/categories.entity";
import { Details } from "../Entidades/details.entity";
import { Orders } from "../Entidades/orders.entity";
import { Products } from "../Entidades/products.entity";
import { Users } from "../Entidades/user.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./orders.service";

 @Module({
   imports:[
    TypeOrmModule.forFeature([Details]),
    TypeOrmModule.forFeature([Orders]),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Products])

] ,
    providers: [OrderService],
    controllers: [OrderController],
 })
 
 export class OrderModule{}