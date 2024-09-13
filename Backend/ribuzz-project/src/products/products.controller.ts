/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
//import { Products } from "src/Entidades/products.entity";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
//import { AdminGuard } from "src/Guardianes/admin.guard";
//import { EntrepreneurGuard } from "src/Guardianes/entrepreneur.guard";
import { CreateProductDto, upDateProduct } from "./Dto/products.dto";
import { Products } from "src/Entidades/products.entity";


@ApiTags('Products')
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

    @Get('/:id')
    async getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }


    @Post()
    //@UseGuards(AdminGuard, EntrepreneurGuard)
    @ApiBearerAuth()
    @ApiBody({ type: CreateProductDto })
    async createProduct(@Body() productDto: any) {
        const { categories, ...productData } = productDto;
        return this.productsService.createProduct(categories, productData);
    }
    
    @Put('/:id')
    @ApiBearerAuth()
    @ApiBody({ type: upDateProduct })
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: any): Promise<Products> {
        const { categories, ...productData } = updateProductDto; // Desestructuración correcta
        return await this.productsService.updateProduct(id, categories, productData);
}




    @Delete('/:id')
    @ApiBearerAuth()
    async deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}
