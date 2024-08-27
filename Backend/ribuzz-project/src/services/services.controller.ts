/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { Services } from "src/Entidades/services.entity";
import { AdminGuard } from "src/Guardianes/admin.guard";

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Get()
    async getServices(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 8
    ) {
        return this.servicesService.getServices(page, limit);
    }

    @Get(':id')
    async getServiceById(@Param('id') id: string) {
        return this.servicesService.getServiceById(id);
    }

    
    @Post()
    async createService(@Body() service: Services) {
        return this.servicesService.createService(service);
    }

    
    @Put(':id')
    async updateService(@Param('id') id: string, @Body() service: Services) {
        return this.servicesService.updateService(id, service);
    }

    
    @Delete(':id')
    async deleteService(@Param('id') id: string) {
        return this.servicesService.deleteService(id);
    }
}
