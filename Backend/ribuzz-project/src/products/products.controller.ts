import { Controller, Get, Post, Put, Delete, Body, Param, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Products } from "src/Entidades/products.entity";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getProducts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5
    ) {
        return this.productsService.getProducts(page, limit);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }

    @Post()
    async createProduct(@Body() product: Products) {
        return this.productsService.createProduct(product);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: Products) {
        return this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}
