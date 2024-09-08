import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { Events } from "src/Entidades/events.entity";
import { Services } from "src/Entidades/services.entity";
// import { Categories } from "../Entidades/categories.entity";
import { Details } from "../Entidades/details.entity";
import { Orders } from "../Entidades/orders.entity";
import { Products } from "../Entidades/products.entity";
import { Users } from "../Entidades/user.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./orders.service";
import { SharedModule } from "src/shared/shared.module";

 @Module({
   imports:[
    TypeOrmModule.forFeature([Details]),
    TypeOrmModule.forFeature([Orders]),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Products]),
    TypeOrmModule.forFeature([Services]),
    TypeOrmModule.forFeature([Events]),
    SharedModule
] ,
    providers: [OrderService],
    controllers: [OrderController],
 })
 
 export class OrderModule{}