import { Body,Controller,Get,Post,Query } from "@nestjs/common";
import { OrderService } from "./orders.service";


@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService){}



@Post()
addOrder(@Body() order:any){
    const { userId, products} = order;
    return this.orderService.AddOrder(userId, products);
}

@Get(":id")
getOrder(@Query("id") id: string){
 return this.orderService.getOrder(id)
}
}