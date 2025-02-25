import { ProductStoreApi } from '@angular-monorepo/product-store.api';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreMid {
  private _api: ProductStoreApi = inject(ProductStoreApi);
}
