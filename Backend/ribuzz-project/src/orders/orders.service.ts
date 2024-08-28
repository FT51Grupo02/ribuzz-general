import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Details } from "../Entidades/details.entity";
import { Orders } from "../Entidades/orders.entity";
import { Products } from "../Entidades/products.entity";
import { Users } from "../Entidades/user.entity";
import { CreateProductDto } from "src/products/Dto/products.dto";

@Injectable()
export class OrderService{
    constructor(@InjectRepository(Orders)
     private OrderRepository:Repository<Orders>,

     @InjectRepository(Details) 
     private orderDetailRepository:Repository<Details>,

      @InjectRepository(Users) 
      private userRepository:Repository<Users>,

       @InjectRepository(Products) 
       private productsRepository:Repository<Products>){}

       async AddOrder(userId: string, product: any){
        let total = 0;
        const user = await this.userRepository.findOneBy({ id:userId });
        if(!user){
            return "user not found"
        }
        const order = new Orders();
        order.date = new Date();
        order.user = user;
        
        const newOrder = await this.OrderRepository.save(order);
        
        const productsArray = await Promise.all(
            product.map(async (element) => {
                const product = await this.productsRepository.findOneBy({
                     id: element.id
                    });
            
                    if(!product){
                        return "producto no encontrado"
                    }
                    total += Number(product.price);
        
                    await this.productsRepository.update({ id: element.id}, {stock: product.stock - 1 });
                    console.log(product.price);
                    return product
                    
            })
        )
        const orderdetail = new Details()
        
        orderdetail.total = Number(Number(total).toFixed(2));
        orderdetail.products = productsArray;
        orderdetail.order = newOrder;
        
        console.log(orderdetail);
        
        await this.orderDetailRepository.save(orderdetail);
        
        console.log(orderdetail);
        
        return await this.OrderRepository.find({ where:{ id: newOrder.id},
        relations:{
           orderDetails: true
        }
        })
        }
        
        async getOrder(id:string){
            const order = await this.OrderRepository.findOne({where: {id},
            relations:{ orderDetails:{products:true}}})
            if(!order){
                return "order no encontrada"
            }
            return order;
        }
        }