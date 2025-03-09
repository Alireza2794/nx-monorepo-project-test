import { ProductStoreApi } from '@angular-monorepo/product-store.api';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutStoreApi {
  private _http: HttpClient = inject(HttpClient);
  private _productStoreApi: ProductStoreApi = inject(ProductStoreApi);

  getCartData$() {
    return this._productStoreApi.getCartData$();
  }
}
