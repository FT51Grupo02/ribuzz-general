import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { Products } from "../Entidades/products.entity";
import { Categories } from "../Entidades/categories.entity";
  @Module({
    imports:[TypeOrmModule.forFeature([Products, Categories])],
    providers: [ProductsService],
    controllers: [ProductsController],
  })
  
  export class ProductsModule{}  