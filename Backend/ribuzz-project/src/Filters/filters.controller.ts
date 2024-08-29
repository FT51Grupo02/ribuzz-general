/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from "@nestjs/common";
import { FilterDto } from "./Dto/filters.dto";
import { FilterService } from "./filters.service";
import { Products } from "src/Entidades/products.entity";

@Controller('products')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('search')
  async search(@Query() query: FilterDto): Promise<Products[]> {
    return this.filterService.search(query);
  }
}