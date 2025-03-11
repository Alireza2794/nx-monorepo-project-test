import { Injectable } from '@nestjs/common';
import { ProductModel } from '../product/product.service';

export interface OrdersModel {
  totalCount: number;
  totalAmount: number;
  Items: ProductModel[];
}

@Injectable()
export class CartService {
  cartData = {
    totalCount: 0,
    totalAmount: 0,
    Items: [] as ProductModel[],
  };

  getCartData(): { data: OrdersModel } {
    return { data: this.cartData };
  }

  updateCart(updatedData: OrdersModel) {
    this.cartData.totalCount = updatedData.totalCount;
    this.cartData.totalAmount = updatedData.totalAmount;
    this.cartData.Items = updatedData.Items;

    return this.cartData;
  }
}
