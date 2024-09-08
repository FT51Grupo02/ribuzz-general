import { Controller, Get, Query } from "@nestjs/common";
import { FilterService } from "./filters.service";
import { Products } from "src/Entidades/products.entity";
import { FilterDto } from "./Dto/filters.dto";
import { Services } from "src/Entidades/services.entity";
import { Events } from "src/Entidades/events.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Search')
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

  @Get('/events')
  async searchEvents(@Query() any:FilterDto) :Promise<Events[]>{
    return this.filterService.searchEvents(any);
  }
}