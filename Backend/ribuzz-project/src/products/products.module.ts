import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { Products } from "../Entidades/products.entity";
import { Categories } from "../Entidades/categories.entity";
import { SharedModule } from "src/shared/shared.module";
  @Module({
    imports:[TypeOrmModule.forFeature([Products, Categories]), SharedModule],
    providers: [ProductsService],
    controllers: [ProductsController],
  })
  
  export class ProductsModule{}  