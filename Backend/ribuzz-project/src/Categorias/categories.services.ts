/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from "src/Entidades/categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>) {}


    async categoryList(){
        const categories = await this.categoriesRepository.find();
        return categories.map(category => category.nombre);
    }

    //Investigar por categoria especifica
    async findCategory(nombre: string){
        if(!nombre){throw new BadRequestException('Por favor inserte la categoria')}
        
        const findCategory = await this.categoriesRepository.findOne({
            where:{nombre},
            relations: {
                productos:true
            }
        })

        if(!findCategory){throw new BadRequestException('Categoria no se encuentra disponible')}

        else {return findCategory};
    }

    //Crear categoria
    async imputCategory(nombre: string): Promise<Categories> {
        // Detectar si la casilla no está vacía
        if (!nombre) {
            throw new BadRequestException('La casilla nombre no puede quedar vacía');
        }

        // Detectar si la categoría existe previamente
        const existentCategory = await this.categoriesRepository.findOne({where:{nombre}});
        if (existentCategory) {
            throw new BadRequestException('La categoría ya se encuentra registrada');
        }

        // Crear y guardar la nueva categoría
        const newCategory = this.categoriesRepository.create({nombre});
        return await this.categoriesRepository.save(newCategory);
    }

    async deleteCategory(nombre:string):Promise<void>{

        if(!nombre) {throw new BadRequestException("Por favor ingrese la categoria")}
        
        const categoryToDelete= await this.categoriesRepository.findOne({where:{nombre},})
        
        if(!categoryToDelete){throw new BadRequestException("Categoria no encontrada")}

        await this.categoriesRepository.delete(categoryToDelete.id)
    }
    
}
