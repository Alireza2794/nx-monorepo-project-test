import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductController, CartController],
  providers: [AppService, ProductService, CartService],
})
export class AppModule {}
