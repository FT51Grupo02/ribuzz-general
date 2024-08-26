import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../Entidades/products.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private productRepository: Repository<Products>
    ) {}

    async getProducts(page: number, limit: number): Promise<Products[]> {
        try {
            const skip = (page - 1) * limit;
            return await this.productRepository.find({
                skip,
                take: limit,
                relations: ['details', 'categories'] 
            });
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener los productos');
        }
    }

    async getProductById(id: string): Promise<Products> {
        try {
            const product = await this.productRepository.findOne({
                where: { id },
                relations: ['details', 'categories'] 
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

    async createProduct(product: Products): Promise<Products> {
        try {
            const newProduct = this.productRepository.create(product);
            return await this.productRepository.save(newProduct);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear el producto');
        }
    }

    async updateProduct(id: string, product: Partial<Products>): Promise<Products> {
        try {
            // Actualiza las propiedades simples
            const { details, categories, ...otherProperties } = product;
            await this.productRepository.update(id, otherProperties);
    
            // Recupera el producto actualizado
            const updatedProduct = await this.productRepository.findOne({
                where: { id },
                relations: ['details', 'categories'] 
            });
    
            if (!updatedProduct) {
                throw new NotFoundException(`Producto con id ${id} no encontrado`);
            }
    
            // Actualiza la relación details si fue proporcionada
            if (details) {
                updatedProduct.details = details;
            }
    
            // Actualiza la relación categories si fue proporcionada
            if (categories) {
                updatedProduct.categories = categories;
            }
    
            // Guarda el producto con las relaciones actualizadas
            await this.productRepository.save(updatedProduct);
    
            return updatedProduct;
        } catch (error) {
            console.error('Error al actualizar el producto:', error); // Imprimir el error en la consola
            if (error instanceof NotFoundException) {
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
}