import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Products } from "src/Entidades/products.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/Guardianes/admin.guard";
import { EntrepreneurGuard } from "src/Guardianes/entrepreneur.guard";


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
    @UseGuards(AdminGuard)
    @UseGuards(EntrepreneurGuard)
    @ApiBearerAuth()
    async createProduct(@Body() productDto: any) {
        const { categories, ...productData } = productDto;
        return this.productsService.createProduct(categories, productData);
    }
    
    @Put('/:id')
    @UseGuards(AdminGuard)
    @UseGuards(EntrepreneurGuard)
    @ApiBearerAuth()
        async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDto: { categories: string[], product: Partial<Products> }) 
        {
            const { categories, product } = updateProductDto;
            return await this.productsService.updateProduct(id, categories, product);
        }


    @Delete('/:id')
    @UseGuards(AdminGuard)
    @UseGuards(EntrepreneurGuard)
    @ApiBearerAuth()
    async deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}
