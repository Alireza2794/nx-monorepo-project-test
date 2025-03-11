import { Body, Controller, Get, Put } from '@nestjs/common';
import { CartService, OrdersModel } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('')
  getProductData(): { data: OrdersModel } {
    return this.cartService.getCartData();
  }

  @Put('')
  updateCart(@Body() body: OrdersModel) {
    const updatedCart = this.cartService.updateCart(body);
    return { message: 'Cart updated successfully', data: updatedCart };
  }
}
