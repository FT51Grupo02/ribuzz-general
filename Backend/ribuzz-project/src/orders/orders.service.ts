/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Details } from "../Entidades/details.entity";
import { Orders } from "../Entidades/orders.entity";
import { Products } from "../Entidades/products.entity";
import { Users } from "../Entidades/user.entity";
//import { CreateProductDto } from "src/products/Dto/products.dto";

@Injectable()
export class OrderService{
    constructor(

    @InjectRepository(Orders)
     private orderRepository:Repository<Orders>,

    @InjectRepository(Details) 
    private orderDetailRepository:Repository<Details>,

    @InjectRepository(Users) 
    private userRepository:Repository<Users>,

    @InjectRepository(Products) 
    private productsRepository:Repository<Products>){}

    //Ordenar un producto
    async addOrderProduct(userId: string, product:any){
        
        const user = await this.userRepository.findOneBy({id:userId})
        if(!user){throw new BadRequestException("Usuario no encontrado");}

    
        let total_price=0

        //Generar orden de compra de productos
        const newOrder = new Orders()
        newOrder.user = user
        newOrder.date = new Date()

        const genarteNewOrder = await this.orderRepository.save(newOrder)

        const productsCar = await Promise.all(
            product.map(async (element)=>{
                const diseableProduct = await this.productsRepository.findOneBy({id:element.id})

                if(!diseableProduct){return {message:"Producto no disponible"}}

                else if(diseableProduct.stock===0){throw new BadRequestException("No hay unidades disponibles")}

                total_price += Number(product.price)

                await this.productsRepository.update({id:element.id},{stock:element.stock-1})
                return product
            })
        )

        //const new_Detail_Order = new Details()



    }

}