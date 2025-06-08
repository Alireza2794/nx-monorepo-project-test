import {
  ApiResponce,
  ApiResponceCart,
  OrdersModel,
  ProductModel,
} from '@angular-monorepo/product-store.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreApi {
  private _http: HttpClient = inject(HttpClient);

  private baseURL = 'http://localhost:3000/api';

  getProductData$(query: string): Observable<ApiResponce> {
    return this._http.get<ApiResponce>(
      `${this.baseURL}/product/?query=${query}`
    );
  }

  insertProduct$(body: ProductModel): Observable<any> {
    return this._http.post<ProductModel>(`${this.baseURL}/product`, body);
  }

  updateProduct$(body: ProductModel): Observable<any> {
    return this._http.put<ProductModel>(
      `${this.baseURL}/product/${body.id}`,
      body
    );
  }

  removeProduct$(id: number): Observable<any> {
    return this._http.delete(`${this.baseURL}/product/${id}`);
  }

  getCartData$(): Observable<ApiResponceCart> {
    return this._http.get<ApiResponceCart>(`${this.baseURL}/cart`);
  }

  updateCart$(body: OrdersModel): Observable<ApiResponceCart> {
    return this._http.put<ApiResponceCart>(`${this.baseURL}/cart`, body);
  }
}
