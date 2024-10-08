/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Body, Param, Query, Put } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { Services } from "src/Entidades/services.entity";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
//import { AdminGuard } from "src/Guardianes/admin.guard";
//import { EntrepreneurGuard } from "src/Guardianes/entrepreneur.guard";
import { CreateServiceDto } from "./Dto/service.dto";


@ApiTags('Services')
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
    //@UseGuards(AdminGuard, EntrepreneurGuard)
    @ApiBearerAuth()
    @ApiBody({type: CreateServiceDto})
    async createService(@Body() serviceDto: any) {
        const {categories, ...serviceData} = serviceDto
        return this.servicesService.createService(categories,serviceData);
    }

    
    @Put('/:id')
    @ApiBearerAuth()
    async updateService(
        @Param('id') id: string,
    @Body() updateServiceDto: { categories: string[], service: Partial<Services> }) {
        return await this.servicesService.updateService(id, updateServiceDto.categories, updateServiceDto.service);
    }


    
    @Delete(':id')
    @ApiBearerAuth()
    async deleteService(@Param('id') id: string) {
        return this.servicesService.deleteService(id);
    }
}
