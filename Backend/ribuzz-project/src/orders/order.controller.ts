/* eslint-disable prettier/prettier */
import { Body,Controller,Get,Post,Query } from "@nestjs/common";
import { CreateOrderDto } from "./dto/order.dto";
import { OrderService } from "./orders.service";


@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService){}



@Post()
addOrderProduct(@Body() order:CreateOrderDto){
    const { userId, products} = order;
    return this.orderService.AddOrder(userId, products);
}

@Get(":id")
getOrder(@Query("id") id: string){
 return this.orderService.getOrder(id)
}
}