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


    //Lista de ordenes de compra

    async orderList(page:number, limit:number){
        const orders = await this.orderRepository.find();
        const start = (page - 1) * limit;
        const end = start + limit;
        const listProduct = orders.slice(start,end)
        
        return listProduct.map((list) => list);
    }

    //Generar una orden de compra 
    
async AddOrder(userId: string, product: any){
    let totals = 0;
    const user = await this.userRepository.findOneBy({ id:userId });
    if(!user){
        return "user not found"
    }
    const order = new Orders();
    order.date = new Date();
    order.user = user;
    
    const newOrder = await this.orderRepository.save(order);
    
    const productsArray = await Promise.all(
        product.map(async (element) => {
            console.log(element);
            const product = await this.productsRepository.findOneBy({id:element.id});
        
                if(!product){
                    return "product no encontrado"
                }
                totals += Number(product.price);
    
                await this.productsRepository.update({ id: element.id}, {stock: product.stock - 1 });
                console.log(product.price);
                console.log(product);
                return product
                
        })
    )
    const orderdetail = new Details()
    
    orderdetail.total= Number(Number(totals).toFixed(2));
    orderdetail.products = productsArray;
    orderdetail.order = newOrder;
    
    console.log(orderdetail);
    
    await this.orderDetailRepository.save(orderdetail);
    
    return await this.orderRepository.findOne({ where:{ id: newOrder.id},
    relations:{
       // Details: true,
        Details:{products:true}
    }
    })
    }
    
    async getOrder(id:string){
        const order = await this.orderRepository.findOne({where: {id},
        relations:{ Details:{products:true} }})
        console.log(order);
        
        if(!order){
            return "order no encontrada"
        }
        return order;
    }
    }