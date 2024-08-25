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
        return categories.map(category => category.name);
    }

    //Investigar por categoria especifica
    async findCategory(name: string){
        if(!name){throw new BadRequestException('Por favor inserte la categoria')}
        
        const findCategory = await this.categoriesRepository.findOne({
            where:{name},
            relations: {
                products:true
            }
        })

        if(!findCategory){throw new BadRequestException('Categoria no se encuentra disponible')}

        else {return findCategory};
    }

    //Crear categoria
    async imputCategory(name: string): Promise<Categories> {
        // Detectar si la casilla no está vacía
        if (!name) {
            throw new BadRequestException('La casilla nombre no puede quedar vacía');
        }

        // Detectar si la categoría existe previamente
        const existentCategory = await this.categoriesRepository.findOne({where:{name}});
        if (existentCategory) {
            throw new BadRequestException('La categoría ya se encuentra registrada');
        }

        // Crear y guardar la nueva categoría
        const newCategory = this.categoriesRepository.create({name});
        return await this.categoriesRepository.save(newCategory);
    }

    async deleteCategory(name:string):Promise<void>{

        if(!name) {throw new BadRequestException("Por favor ingrese la categoria")}
        
        const categoryToDelete= await this.categoriesRepository.findOne({where:{name},})
        
        if(!categoryToDelete){throw new BadRequestException("Categoria no encontrada")}

        await this.categoriesRepository.delete(categoryToDelete.id)
    }
    
}
