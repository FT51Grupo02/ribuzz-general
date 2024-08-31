/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from "@nestjs/common";
import { FilterService } from "./filters.service";
import { Products } from "src/Entidades/products.entity";
import { FilterDto } from "./Dto/filters.dto";
import { Services } from "src/Entidades/services.entity";

@Controller('search')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('/products')
  async searchProducts(@Query() any:FilterDto) :Promise<Products[]>{
    return this.filterService.searchProducts(any);
  }

  @Get('/services')
  async searchServices(@Query() any:FilterDto) :Promise<Services[]>{
    return this.filterService.searchServices(any);
  }
}