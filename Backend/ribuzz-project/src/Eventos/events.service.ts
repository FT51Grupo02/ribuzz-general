/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Events } from "src/Entidades/events.entity";
import { Categories } from "src/Entidades/categories.entity";

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Events) private eventRepository: Repository<Events>,
        @InjectRepository(Categories) private categoryRepository: Repository<Events>
    ) {}

    async getEvent(page: number, limit: number): Promise<Events[]> {
        try {
            const skip = (page - 1) * limit;
            return await this.eventRepository.find({
                skip,
                take: limit,
                relations: ['categories']
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
                relations:['categories']
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

    async createEvent(categoryName:string[] ,product: Events): Promise<Events> {
        try {

            const categories =[]

            if(!categoryName || categoryName.length===0 || !Array.isArray(categoryName)){
                throw new BadRequestException("Por favor ingrese la(s) categoria(s)")
            }

            for(const name of categoryName){
                const category = await this.categoryRepository.findOne({where:{name}})
                if(!category){throw new BadRequestException()}
                else{categories.push(category)}
            }

            const newProduct = this.eventRepository.create(product);
            return await this.eventRepository.save(newProduct);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear el evento'+error);
        }
    }

    // async updateEvent(id: string, event: Partial<Events>): Promise<Events> {
    //     try {
            
          ///  const { details, categories, ...otherProperties } = event;
           // await this.eventRepository.update(id, otherProperties);
    
            
            // const updatedEvent = await this.eventRepository.findOne({
            //     where: { id },
            //     relations: ['details', 'categories'] 
            // });
    
            // if (!updatedEvent) {
            //     throw new NotFoundException(`evento con id ${id} no encontrado`);
            // }
    
           // if (details) {
            //     updatedProduct.details = details;
            // }
    
            // if (categories) {
            //     updatedProduct.categories = categories;
            // }
    
            // await this.eventRepository.save(updatedProduct);
            // return updatedProduct;
    //     } catch (error) {
    //         console.error('Error al actualizar el producto:', error); 
    //         if (error instanceof NotFoundException) {
    //             throw error;
    //         }
    //         throw new InternalServerErrorException('Error al actualizar el Evento');
    //     }
    // }
    

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