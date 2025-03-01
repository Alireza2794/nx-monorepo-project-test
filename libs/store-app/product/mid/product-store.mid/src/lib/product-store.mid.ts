import { ProductStoreApi } from '@angular-monorepo/product-store.api';
import { ProductModel } from '@angular-monorepo/product-store.model';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreMid {
  private _api: ProductStoreApi = inject(ProductStoreApi);

  getProductList$() {
    return this._api.getProductData$();
  }

  insertProduct$(body: ProductModel) {
    this._api.insertProduct$(body);
  }
}
