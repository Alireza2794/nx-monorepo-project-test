import {
  ApiResponce,
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

  private baseURL = 'http://localhost:3000/api';

  getProductData$(query: string): Observable<ApiResponce> {
    return this._http.get<ApiResponce>(
      `${this.baseURL}/product?query=${query}`
    );
  }

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

  // getProductData$(query: string): Observable<ProductModel[]> {
  //   return of(this.data.filter((item) => item.title.includes(query)));
  // }

  insertProduct$(body: ProductModel): Observable<any> {
    // this.data.push(body);
    return this._http.post<ProductModel>(`${this.baseURL}/product`, body);
  }

  updateProduct$(body: ProductModel): Observable<any> {
    // const productIndex = this.data.findIndex((item) => item.id == body.id);
    // this.data[productIndex] = body;

    return this._http.put<ProductModel>(
      `${this.baseURL}/product/${body.id}`,
      body
    );
  }

  removeProduct$(id: number): Observable<any> {
    // const productIndex = this.data.findIndex((item) => item.id == id);
    // if (productIndex !== -1) {
    //   this.data.splice(productIndex, 1);
    // }

    return this._http.delete(`${this.baseURL}/product/${id}`);
  }

  cartData = {
    totalCount: 0,
    totalAmount: 0,
    Items: [] as ProductModel[],
  };

  getCartData$(): Observable<OrdersModel> {
    return of(this.cartData);
  }

  updateCart$(body: OrdersModel) {
    this.cartData.totalCount = body.totalCount;
    this.cartData.totalAmount = body.totalAmount;
    this.cartData.Items = body.Items;
  }
}
