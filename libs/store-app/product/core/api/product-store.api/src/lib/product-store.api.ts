import {
  OrdersModel,
  ProductModel,
} from '@angular-monorepo/product-store.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreApi {
  private _http: HttpClient = inject(HttpClient);

  data = [
    {
      id: 1,
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Product test',
      price: '100',
      description:
        ' The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
    },
    {
      id: 2,
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Product Dog',
      price: '120',
      description:
        ' The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
    },
  ];

  getProductData$(query: string): Observable<ProductModel[]> {
    return of(this.data.filter((item) => item.title.includes(query)));
  }

  insertProduct$(body: ProductModel) {
    this.data.push(body);
  }

  updateProduct$(body: ProductModel) {
    const productIndex = this.data.findIndex((item) => item.id == body.id);
    this.data[productIndex] = body;
  }

  removeProduct$(id: number) {
    const productIndex = this.data.findIndex((item) => item.id == id);
    if (productIndex !== -1) {
      this.data.splice(productIndex, 1);
    }
  }

  cartData = {
    totalCount: 0,
    totalAmount: 0,
    Items: [] as ProductModel[],
  };

  getCartData$(): Observable<OrdersModel> {
    return of(this.cartData);
  }

  addToCart$(body: OrdersModel) {
    this.cartData.totalCount = body.totalCount;
    this.cartData.totalAmount = body.totalAmount;
    this.cartData.Items = body.Items;
  }
}
