import { ProductStoreApi } from '@angular-monorepo/product-store.api';
import { ProductModel } from '@angular-monorepo/product-store.model';
import { ProductsStore } from '@angular-monorepo/product-store.state';
import { ProductStoreUtility } from '@angular-monorepo/product-store.utility';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreMid {
  private _api: ProductStoreApi = inject(ProductStoreApi);
  private _utility: ProductStoreUtility = inject(ProductStoreUtility);
  public store = inject(ProductsStore);

  fileUrlFinall = signal<string>('');

  constructor() {
    this.fileUrlFinall = this._utility.fileUrlFinall;
  }

  getProductList$(query: string) {
    return this.store.loadByQuery(query);
  }

  store$() {
    return this.store;
  }

  store_query$() {
    return this.store.filter.query();
  }

  updateQuery(query: string) {
    this.store.updateQuery(query);
  }

  insertProduct$(body: ProductModel) {
    this.store.addProduct(body);
  }

  updateProduct$(body: ProductModel) {
    this.store.updateProduct(body);
  }

  removeProduct$(id: number) {
    this.store.removeProduct(id);
  }

  getProductForm() {
    return this._utility.createProductForm();
  }

  uploadImage(input: File | Event): void {
    return this._utility.handleFileInput(input);
  }
}
