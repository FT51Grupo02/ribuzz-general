
/* eslint-disable prettier/prettier */
import { Products } from "src/Entidades/products.entity";
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Products } from "src/Entidades/products.entity";

@Controller('products')

export class ProductsControler{
    constructor(private readonly productsService: ProductsService){}

  @Get()
  async getProduct(@Query('page') page:number, @Query('limit') limit:number){
    try{
      if(page && limit){
        return this.productsService.getProducts(page,limit)
      }
      return this.productsService.getProducts(1,5)
    }
    catch(e){
      throw new Error("Error al traer la lista"+e);
      
//  @Get('seeder')
//  addProducts(){
//   return this.productsService.AddProduct();
//  } 


  @Get(':id')
  async getProductById(@Param('id') id: string ){
  return this.productsService.getProductById(id)
  }
  
  
  @Post()
  async createproduct(@Body() product: Products){
    try{
      return this.productsService.createProduct(product);
    }
    catch(e){
      throw new Error("Hubo un problema al crear el producto"+e)
    }
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
