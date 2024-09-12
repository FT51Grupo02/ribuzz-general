/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { Products } from "../Entidades/products.entity";
import { Categories } from "../Entidades/categories.entity";
import { SharedModule } from "src/shared/shared.module";
import { DateFormatModule } from "src/DateFormat/dateformat.module";

  
@Module({
    imports:[TypeOrmModule.forFeature([Products, Categories]), DateFormatModule,SharedModule],
    providers: [ProductsService],
    controllers: [ProductsController],  
})
  
  export class ProductsModule{}  