/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../Entidades/products.entity";
import { Categories } from "src/Entidades/categories.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private productRepository: Repository<Products>,
        @InjectRepository(Categories) private categoryRepository: Repository<Categories>
    ) {}

    private formatDate(date: Date): string {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' } as const;
        return new Intl.DateTimeFormat('es-LA', options).format(date).replace(/\//g, '/');
    }

    async getProducts(page: number, limit: number): Promise<Products[]> {
        try {
            const skip = (page - 1) * limit;
            return await this.productRepository.find({
                skip,
                take: limit,
                relations: ['categories']
                //relations: ['orderdetails', 'categories'] 
            });
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener los productos'+error);
        }
    }

    async getProductById(id: string): Promise<Products> {
        try {
            const product = await this.productRepository.findOne({
                where: { id },

                 relations:{reviews:true}
            
                // relations: ['details', 'categories'] 
            });
            if (!product) {
                throw new NotFoundException(`Producto con id ${id} no encontrado`);
            }
            return product;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al obtener el producto');
        }
    }

    async createProduct(categoryNames: string[], product: Partial<Products>): Promise<Products> {

        try{
            const categories =[]

            if(!categoryNames || !Array.isArray(categoryNames) || categoryNames.length===0){
                throw new BadRequestException("Por favor ingrese la categorias para este producto")
            }

            for(const name of categoryNames){
                const category = await this.categoryRepository.findOneBy({name})
                if(!category){throw new BadRequestException("La(s) categoria(s) no se encuentra(n) registrada(s)")}
                else{ categories.push(category)}
            }

            if(product.publicateDate){
                product.publicateDate = this.formatDate(new Date(product.publicateDate))
            }

            const new_product = await this.productRepository.create({
                ...product,
                categories
            })
            
            return await this.productRepository.save(new_product)
        }
        catch(error){
            if( error instanceof BadRequestException ){
                throw error
            }
            else {throw new InternalServerErrorException('Error al crear el producto: ' + error)}
        }
    }
    async upDateProduct(id: string, prducts: Partial<Products>){
        
        const newprduct = await this.productRepository.findOneBy({id})
        if(!newprduct){throw new BadRequestException("El producto no existe")}
        
       const upDateproduct  = {...newprduct,...prducts}

       await this.productRepository.save(upDateproduct)
       return upDateproduct 
    }   
    
    async deleteProduct(id: string): Promise<void> {
        try {
            const result = await this.productRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Producto con id ${id} no encontrado`);
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al eliminar el producto');
        }
    }

    async purchaseProduct(id: string, quantity: number): Promise<Products> {
        try {
            const product = await this.getProductById(id);

            if (product.stock < quantity) {
                throw new BadRequestException(`No hay suficiente stock para el producto con id ${id}`);
            }

            product.stock -= quantity;

            return await this.productRepository.save(product);
        } catch (error) {
            console.error('Error al realizar la compra:');
            throw error;
        }
    }
}