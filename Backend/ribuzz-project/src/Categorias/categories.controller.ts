/* eslint-disable prettier/prettier */
import { Get,Body, Post, Controller, Delete, BadRequestException, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.services";
import { AuthGuard } from "src/Guardianes/Auth.guard";


@Controller("categories")
export class CategoriesControl{
    constructor(private categoriesServive: CategoriesService) {}

    @Get('/')
    async categoryList(){
        try{
            const lista = await this.categoriesServive.categoryList();
            const compList = lista.join(', ')
            return {message:`Esta son las categorias que se encuentran registradas: ${compList}`}
        }
        catch(error){
            throw new BadRequestException(`Hubo un error al encontrar la lista de categorias ${error}`);
        }
    }

    @Post('/')
    async findCategory(@Body('nombre') nombre:string){
        try{
            return this.categoriesServive.findCategory(nombre)
        }
        catch(error){
            throw new BadRequestException(`Hubo un error al encontrar la categoria ${error}`);
        }
    }
    
    @UseGuards(AuthGuard)
    @Post('/agregar')
    async imputCategory(@Body('nombre') nombre: string){
        try{
            return this.categoriesServive.imputCategory(nombre)
        }
        catch(error){
            throw new BadRequestException(`Hubo un error al agregar la categoria ${error}`);
        }
    }

    @Delete('/eliminar')
    async deleteCategory(@Body("nombre") nombre:string){
          try{
            await this.categoriesServive.deleteCategory(nombre)
            return {message:`La categoria ${nombre} ha sido eliminada éxitosamene`}
          }  
          catch(error){
            throw new BadRequestException(`Hubo un error al eliminar la categoria ${error}`);
          }
    }
}