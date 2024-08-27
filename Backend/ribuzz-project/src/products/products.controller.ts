/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Products } from "src/Entidades/products.entity";
import { AdminGuard } from "src/Guardianes/admin.guard";
import { EntrepreneurGuard } from "src/Guardianes/entrepreneur.guard";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    
    @Get()
    async getProducts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 8
    ) {
        return this.productsService.getProducts(page, limit);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }


    @UseGuards(AdminGuard, EntrepreneurGuard)
    @Post()
    async createProduct(@Body() product: Products) {
        return this.productsService.createProduct(product);
    }

    // @UseGuards(AdminGuard)
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: Products) {
        return this.productsService.updateProduct(id, product);
    }

    // @UseGuards(AdminGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}
