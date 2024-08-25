import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../Entidades/products.entity";
import { Categories } from "../Entidades/categories.entity";

@Injectable()
export class ProductsService{
    constructor(@InjectRepository(Products) private productRepository:Repository<Products>
    // ,
    // @InjectRepository(Categories) private categoryRepository:Repository<Categories>
    ){}


    async getProducts(page:number, limit:number):Promise<Products[]> {
        let product = await this.productRepository.find({
            // relations:{
            //     categoria:true
            // }
        })
        const start = (page - 1) * limit; 
        const end = start + +limit;

        product = product.slice(start,end);
        return product;

    }
    
    async getProductById( id: string) {
        const product = await this.productRepository.findOneBy({ id })
        if(!product){
            return "producto no encontrado";
        }
        return product
    }
    async createProduct(Product: any){
        const Products = {...Product}
        const newProduct = await this.productRepository.save(Products)
        return newProduct;
    }

    //seeder!!
    // async AddProduct() {
    //    //return this.productRepository.createProduct(product);
    //    const categories = await this.categoryRepository.find()
    //    data?.map(async (element) =>{
    //        const category = categories.find((caregory) => caregory.name === element.category
    //        )
    //    const product = new Products()
    //    product.name = element.name;
    //    product.description = element.description;
    //    product.price = element.price;
    //    product.imgUrl = element.imgUrl;
    //    product.stock = element.stock;
    //    product.categories = category;
    //    await this.productRepository
    //    .createQueryBuilder()
    //    .insert()
    //    .into(Products)
    //    .values(product)
    //    .orUpdate(['description','price','imgUrl','stock']['name'])
    //    .execute()
    //    });
    //    return "add productssss"
    // }





    async updateProduct(id: string, product: Products){
        //return this.productRepository.UpdateProducts(id, user)
        await this.productRepository.update(id, product);
        
        const upProduct = await this.productRepository.findOneBy({ id });
        return upProduct;
        }
    
    async deleteProduct(id: string){
    return this.productRepository.delete(id)
    }
}
