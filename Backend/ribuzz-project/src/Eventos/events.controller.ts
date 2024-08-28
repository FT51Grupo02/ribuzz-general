import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from "@nestjs/common";
import { EventService } from "./events.service";
import { Products } from "src/Entidades/products.entity";
import { AdminGuard } from "src/Guardianes/admin.guard";

//import { EntrepreneurGuard } from "src/Guardianes/entrepreneur.guard";

// import { EntrepreneurGuard } from "src/Guardianes/entrepreneur.guard";

import { Events } from "src/Entidades/events.entity";

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    
    @Get()
    async getEvent(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5
    ) {
        return this.eventService.getEvent(page, limit);
    }

    @Get(':id')
    async getEventById(@Param('id') id: string) {
        return this.eventService.getEventById(id);
    }


    //@UseGuards(AdminGuard, EntrepreneurGuard)
    @Post()
    async createEvent(@Body() event: Events) {
        return this.eventService.createEvent(event);
    }

    // @UseGuards(AdminGuard)
    // @Put(':id')
    // async updateEvent(@Param('id') id: string, @Body() event: Events) {
    //     return this.eventService.updateevent(id, event);
    // }

    
    // @UseGuards(AdminGuard)
    @Delete(':id')
    async deleteEvent(@Param('id') id: string) {
        return this.eventService.deleteEvent(id);
    }
}
