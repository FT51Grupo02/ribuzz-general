/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Body, Param, Query } from "@nestjs/common";
import { ServicesService } from "./services.service";
//import { Services } from "src/Entidades/services.entity";
//import { AdminGuard } from "src/Guardianes/admin.guard";

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Get()
    async getServices(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 4,
    ) {
        return this.servicesService.getServices(page, limit);
    }

    @Get('/:id')
    async getServiceById(@Param('id') id: string) {
        return this.servicesService.getServiceById(id);
    }

    
    @Post()
    async createService(@Body() serviceDto: any) {
        const{categories, ...serviceDato}=serviceDto
        return this.servicesService.createService(serviceDato,categories);
    }

    
    /*@Put(':id')
    async updateService(@Param('id') id: string, @Body() service: Services) {
      //  return this.servicesService.updateService(id, service);
    }*/

    
    @Delete(':id')
    async deleteService(@Param('id') id: string) {
        return this.servicesService.deleteService(id);
    }
}
