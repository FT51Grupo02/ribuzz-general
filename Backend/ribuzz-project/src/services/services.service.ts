/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Services } from "../Entidades/services.entity";

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Services) private servicesRepository: Repository<Services>
    ) {}

    async getServices(page: number, limit: number): Promise<Services[]> {
        try {
            const skip = (page - 1) * limit;
            return await this.servicesRepository.find({
                skip,
                take: limit,
                relations: ['provider', 'categories' ] 
            });
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener los servicios: ' + error);
        }
    }

    async getServiceById(id: string): Promise<Services> {
        try {
            const service = await this.servicesRepository.findOne({
                where: { id },
                relations: ['provider', 'categories']
            });
            if (!service) {
                throw new NotFoundException(`Servicio con id ${id} no encontrado`);
            }
            return service;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al obtener el servicio');
        }
    }

    async createService(service: Services): Promise<Services> {
        try {
            const newService = this.servicesRepository.create(service);
            return await this.servicesRepository.save(newService);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear el servicio: ' + error);
        }
    }

    // async updateService(id: string, service: Partial<Services>): Promise<Services> {
    //     try {
    //         // Actualiza las propiedades simples
    //         const { provider, categories, ...otherProperties } = service;
    //         await this.servicesRepository.update(id, otherProperties);

    //         // Recupera el servicio actualizado
    //         const updatedService = await this.servicesRepository.findOne({
    //             where: { id },
    //             relations: ['provider', 'categories']
    //         });

    //         if (!updatedService) {
    //             throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    //         }

    //         // Actualiza la relación provider si fue proporcionada
    //         if (provider) {
    //             updatedService.provider = provider;
    //         }

    //         // Actualiza la relación categories si fue proporcionada
    //         if (categories) {
    //             updatedService.categories = categories;
    //         }

    //         // Guarda el servicio con las relaciones actualizadas
    //         await this.servicesRepository.save(updatedService);

    //         return updatedService;
    //     } catch (error) {
    //         console.error('Error al actualizar el servicio:', error); // Imprimir el error en la consola
    //         if (error instanceof NotFoundException) {
    //             throw error;
    //         }
    //         throw new InternalServerErrorException('Error al actualizar el servicio');
    //     }
    // }

    async deleteService(id: string): Promise<void> {
        try {
            const result = await this.servicesRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Servicio con id ${id} no encontrado`);
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al eliminar el servicio');
        }
    }

}
