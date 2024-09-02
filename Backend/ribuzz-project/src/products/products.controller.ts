/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Query, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Products } from "src/Entidades/products.entity";


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    
    @Get()
    async getProducts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 4,
    ) {
        return this.productsService.getProducts(page, limit);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }

  
    @Post()
    async createProduct(@Body() productDto: any) {
        const { categories, ...productData } = productDto;
        return this.productsService.createProduct(categories, productData);
    }
    
    @Put(':id')
async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: { categoryNames: string[], product: Partial<Products> }
) {
    const { categoryNames, product } = updateProductDto;

    // Asegúrate de que product no sea undefined
    if (!product) {
        throw new BadRequestException('El objeto product no puede estar vacío');
    }

    try {
        return await this.productsService.updateProduct(id, categoryNames, product);
    } catch (error) {
        console.error('Error en el controlador al actualizar el producto:', error);
        throw new InternalServerErrorException('Error en el controlador al actualizar el producto');
    }
}

    


   
    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}
