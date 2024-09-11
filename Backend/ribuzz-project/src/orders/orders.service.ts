/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Details } from "../Entidades/details.entity";
import { Orders } from "../Entidades/orders.entity";
import { Products } from "../Entidades/products.entity";
import { Users } from "../Entidades/user.entity";
import { Services } from "src/Entidades/services.entity";
import { Events } from "src/Entidades/events.entity";
import { transporter } from "src/config/nodemailer";
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

    @InjectRepository(Services) 
    private serviceRepository:Repository<Services>,

    @InjectRepository(Events) 
    private eventsRepository:Repository<Events>,


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
    
async AddOrder(userId: string, product:any,service:any,events:any){
    let totals = 0;
    const user = await this.userRepository.findOneBy({ id:userId });
    if(!user){
        return "user not found"
    }
    const order = new Orders();
    order.date = new Date();
    order.user = user;
    
    const newOrder = await this.orderRepository.save(order);
    
    const productCountMap = product.reduce((acc, item) => {
        if (acc[item.id]) {
            acc[item.id] += item.quantity || 1;  // Aumentar la cantidad si ya existe, por defecto 1
        } else {
            acc[item.id] = item.quantity || 1;   // Agregar el producto con cantidad
        }
        return acc;
    }, {});
    const productsArray = await Promise.all(
        Object.keys(productCountMap).map(async (productId) => {
            try {
                const product = await this.productsRepository.findOneBy({ id:productId });
    
                if (!product) {
                    return null;  
                }
    
                const requestedQuantity = productCountMap[productId];
    
                
                if (product.stock < requestedQuantity) {
                    return null;  
                }
    
              
                totals += Number(product.price) * requestedQuantity;
    
               
                await this.productsRepository.update(
                    { id: productId},
                    { stock: product.stock - requestedQuantity }
                );
    
                console.log(`Producto: ${product.name}, Precio: ${product.price}, Cantidad: ${requestedQuantity}`);
                console.log(product);
    
                return product;  
            } catch (error) {
                console.error(`Error al procesar el producto con id ${productId}:`, error);
                return null;  
            }
        })
    );
    
    
    // const validProductsArray = productsArray.filter(product => product !== null);

    const servicesArray = await Promise.all(
        service.map(async (element) => {
            console.log(element);
            const service = await this.serviceRepository.findOneBy({id:element.id});
        
                if(!service){
                    return "product no encontrado"
                }
                totals += Number(service.price);
    
                //await this.serviceRepository.update({ id: element.id}, );
                console.log(service.price);
                console.log(service);
                return service
                
        })
    )

    const eventsArray = await Promise.all(
        events.map(async (element) => {
            console.log(element);
            const events = await this.eventsRepository.findOneBy({id:element.id});
        
                if(!events){
                    return "product no encontrado"
                }
                totals += Number(events.price);
    
                await this.eventsRepository.update({ id: element.id}, {stock: events.stock - 1 });
                console.log(events.price);
                console.log(events);
                return events
                
        })
    )
    const orderdetail = new Details()
    
    orderdetail.total= Number(Number(totals).toFixed(2));
    orderdetail.products = productsArray;
    orderdetail.service = servicesArray;
    orderdetail.events = eventsArray;
    orderdetail.order = newOrder;
    
    console.log(orderdetail);
    
    await this.orderDetailRepository.save(orderdetail);
    

    const info = await transporter.sendMail({
        from: '"RiBuzz team👻" <pfgrupo2ft51@gmail.com>', 
        to: user.email, 
        subject: "gracias por tu compra!", 
        text: `esta fue tu compra`,
        html: `<h1>gracias ${user.name}!!</h1>`, 
        });

    
    return await this.orderRepository.find({ where:{ id: newOrder.id},
    relations:{
        Details:true
    }
    })
    }
    
    async getOrder(id:string){
        const order = await this.orderRepository.find({where: {id:id},
            relations:{ Details:{products:true,service:true , events:true}
        }})
        console.log(order);
        
        if(!order){
            return "order no encontrada"
        }
        return order;
    }
    }