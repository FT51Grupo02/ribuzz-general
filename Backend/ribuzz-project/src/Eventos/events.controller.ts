/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Body, Param, Query, Put, UseGuards } from "@nestjs/common";
import { EventService } from "./events.service";
import { Events } from "src/Entidades/events.entity";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateEventDto } from "./dto/event.dto";
import { AdminGuard } from "src/Guardianes/admin.guard";
import { EntrepreneurGuard } from "src/Guardianes/entrepreneur.guard";

@ApiTags('Events')
@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}
    
    @Get()
    async getEvent(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 3,
    ) {
        return this.eventService.getEvent(page, limit);
    }

    @Get('/:id')
    async getEventById(@Param('id') id: string) {
        return this.eventService.getEventById(id);
    }


    @Post()
    //@UseGuards(AdminGuard, EntrepreneurGuard)
    @ApiBearerAuth()
    @ApiBody({type: CreateEventDto})
    async createEvent(@Body() event: Events) {
        return this.eventService.createEvent(event);
    }

    // @UseGuards(AdminGuard)
    @Put('/:id')
    async upDateEvent(@Param('id') id: string, @Body() event: any) {
        return this.eventService.upDateEvent(id, event);
    }

    
    // @UseGuards(AdminGuard)
    @Delete('/:id')
    async deleteEvent(@Param('id') id: string) {
        return this.eventService.deleteEvent(id);
    }
}
