import { Body,Controller,Get,Post,Param } from "@nestjs/common";
import { CreateOrderDto } from "./dto/order.dto";
import { OrderService } from "./orders.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post()
    addOrderProduct(@Body() order:CreateOrderDto){
        const { userId, products, service,events} = order;
        return this.orderService.AddOrder(userId, products,service,events);
    }

    @Get(":id")
        getOrder(@Param("id") id: string){
        return this.orderService.getOrder(id)
    }
}