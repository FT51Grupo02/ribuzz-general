/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Services } from "../Entidades/services.entity";
import { Categories } from "src/Entidades/categories.entity";

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Services) 
        private servicesRepository: Repository<Services>,
        @InjectRepository(Categories)
        private categoryRepository: Repository<Categories>,
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
                relations: ['provider', 'categories',"reviews"]
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

    async createService(categoryName: string[], service: Partial<Services>): Promise<Services> {
        try {
          if (!Array.isArray(categoryName) || categoryName.length === 0 || !categoryName) {
            throw new BadRequestException("Por favor ingrese la(s) categoria(s)");
          }
      
          const categories = [];
          
          for (const name of categoryName) {
            const category = await this.categoryRepository.findOneBy({ name });
            if (!category) {
              throw new NotFoundException("La(s) categoria(s) no se encontraron");
            }
            categories.push(category);
          }
      
          const newService = this.servicesRepository.create({
            ...service,
            categories // Asegúrate de que 'categories' se asigne correctamente.
          });
      
          return await this.servicesRepository.save(newService);
      
        } catch (error) {
          throw new InternalServerErrorException('Error al crear el servicio: ' + error);
        }
      }
      

    async updateService (id: string, categories:string[], service:Partial<Services>){
        try{
            
            if(!Array.isArray(categories)){throw new BadRequestException('El parámetro categories debe ser un array de nombres de categorías.');}
            
            if(!service || !Object.keys(service).length){throw new BadRequestException('El objeto service no puede estar vacío')}
            
            if(categories.length===0){
                throw new BadRequestException("Esta casilla no puede quedar vacía, por favor elijan categoría(s)");
            }

            const categorieName = []
            for(const name of categories){
                const category = await this.categoryRepository.findOne({where:{name}})
                if(!category){throw new NotFoundException("Por favor introduzca categoria(s) existente")}
                else{categorieName.push(category)}
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const{details, ...otherProperties} = service

            await this.servicesRepository.update(id, otherProperties);

            const updatedService = await this.servicesRepository.findOne({
                where:{id},
                relations: ['categories']
            });

            if (!updatedService) {
                throw new NotFoundException(`Servicio con id ${id} no encontrado`);
            }

            updatedService.categories = categorieName

            if (details) {
                updatedService.details = details;
            }

            await this.servicesRepository.save(updatedService);
    
            return updatedService;

        }
        catch(error){
            throw new InternalServerErrorException(`Error al modificar los datos ${error}`)
        }
    }


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
