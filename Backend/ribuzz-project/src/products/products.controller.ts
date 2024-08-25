import { Controller, Get ,Param, Post ,Put , Delete , Body,Query, UseGuards} from "@nestjs/common";
import { Products } from "src/Entidades/products.entity";

import { ProductsService } from "./products.service";


@Controller('products')
export class ProductsControler{
    constructor(private readonly productsService: ProductsService){}

  @Get()
  getProduct(@Query('page') page:number, @Query('limit') limit:number){
    try{
      if(page && limit){
        return this.productsService.getProducts(page,limit)
      }
      return this.productsService.getProducts(1,5)
    }
    catch(e){
      throw new Error("Error al traer la lista"+e);
    }
  }  

//  @Get('seeder')
//  addProducts(){
//   return this.productsService.AddProduct();
//  } 


  @Get(':id')
  getProductById(@Param('id') id: string ){
  return this.productsService.getProductById(id)
  }
  
  
  @Post()
  createproduct(@Body() product: Products){
  return this.productsService.createProduct(product);
  
  }

  @Put(':id')
  putProduct(@Query('id') id: string, @Body() product:any){
    return this.productsService.updateProduct(id,product)
  }


  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    return this.productsService.deleteProduct( id )
  }
}