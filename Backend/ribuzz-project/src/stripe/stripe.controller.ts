import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Cart } from './Cart.model';
import { ApiExcludeController } from '@nestjs/swagger';


@ApiExcludeController() //Este decorador oculta el controlador en swagger
@Controller('stripe')
export class StripeController {

  constructor(private stripeService:StripeService){}
  @Post()
  checkout(@Body() body: { cart: Cart}) {
    try {
      return this.stripeService.checkout(body.cart)
    } catch (error) {
      return error;
    }
  }
}
