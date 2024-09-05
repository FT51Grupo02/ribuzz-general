/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, InternalServerErrorException,BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Events } from "src/Entidades/events.entity";
import { UpdateEventDto } from "./dto/update-event.dto";


@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Events) private eventRepository: Repository<Events>
       
    ) {}

    async getEvent(page: number, limit: number): Promise<Events[]> {
        try {
            const skip = (page - 1) * limit;
            return await this.eventRepository.find({
                skip,
                take: limit,
               // relations: ['details', 'categories'] 
            });
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener los evento'+error);
        }
    }

    async getEventById(id: string): Promise<Events> {
        try {
            const product = await this.eventRepository.findOne({
                where: { id },
               // relations: ['details', 'categories'] 
            });
            if (!product) {
                throw new NotFoundException(`evento con id ${id} no encontrado`);
            }
            return product;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al obtener el evento');
        }
    }

    async createEvent(event: Events): Promise<Events> {
        try {
            const newProduct = this.eventRepository.create(event);
            return await this.eventRepository.save(newProduct);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear el evento'+error);
        }
    }

    async upDateEvent(id: string, event: UpdateEventDto){
        
        const eventSend = await this.eventRepository.findOneBy({id})
        if(!eventSend){throw new BadRequestException("El evento no existe")}
        
       const upDateEvent  = {...eventSend,...event}

       await this.eventRepository.save(upDateEvent)
       return upDateEvent 
    }   
    
    

    async deleteEvent(id: string): Promise<void> {
        try {
            const result = await this.eventRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`evento con id ${id} no encontrado`);
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al eliminar el evento');
        }
    }
}