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

    async updateProduct(id: string, categories: string[], product: Partial<Products>): Promise<Products> {
        try {
            // Validar si categories es un array
            if (!Array.isArray(categories)) {
                throw new BadRequestException('El parámetro categories debe ser un array de nombres de categorías.');
            }
    
            // Validar si el objeto product es válido
            if (!product || !Object.keys(product).length) {
                throw new BadRequestException('El objeto product no puede estar vacío');
            }
    
            // Validar stock antes de intentar actualizar
            if (product.stock !== undefined && product.stock <= 0) {
                throw new BadRequestException('El stock no puede ser negativo');
            }
    
            // Validar si categories no está vacío
            if (categories.length === 0) {
                throw new BadRequestException("Esta casilla no puede quedar vacía, por favor elijan categoría(s)");
            }
    
            const categoryNames = [];
            // Buscar y validar las categorías por nombre
            for (const name of categories) {
                const category = await this.categoryRepository.findOne({ where: { name } });
                if (!category) {
                    throw new BadRequestException("Por favor ingrese una categoría existente");
                } else {
                    categoryNames.push(category);
                }
            }
    
            const { orderDetails, ...otherProperties } = product;
    
            // Actualizar propiedades generales del producto
            await this.productRepository.update(id, otherProperties);
    
            // Buscar el producto actualizado junto con sus relaciones
            const updatedProduct = await this.productRepository.findOne({
                where: { id },
                relations: ['categories']
            });
    
            if (!updatedProduct) {
                throw new NotFoundException(`Producto con id ${id} no encontrado`);
            }
    
            // Asignar las categorías al producto
            updatedProduct.categories = categoryNames;
    
            // Asignar orderDetails si están presentes
            if (orderDetails) {
                updatedProduct.orderDetails = orderDetails;
            }
    
            // Guardar el producto actualizado con las relaciones
            await this.productRepository.save(updatedProduct);
    
            return updatedProduct;
    
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al actualizar el producto');
        }
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