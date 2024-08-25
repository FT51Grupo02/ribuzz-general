/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Events } from "src/Entidades/events.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventosService{
    constructor(@InjectRepository(Events) private readonly eventsRepository:Repository<Events>){}

    async addEvents (nombre:string){
        
        if(!nombre){throw new BadRequestException("Por favor ingrese el nombre del evento");}
        
        
    }
}