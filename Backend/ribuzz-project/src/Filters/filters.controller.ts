/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from "@nestjs/common";
//import { FilterDto } from "./Dto/filters.dto";
import { FilterService } from "./filters.service";
import { Products } from "src/Entidades/products.entity";
import { FilterDto } from "./Dto/filters.dto";

@Controller('search')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('/products')
  async search(@Query() any:FilterDto) :Promise<Products[]>{
    return this.filterService.search(any);
  }
}