import { ProductStoreApi } from '@angular-monorepo/product-store.api';
import { ProductModel } from '@angular-monorepo/product-store.model';
import {
  OrdersStore,
  ProductsStore,
} from '@angular-monorepo/product-store.state';
import { ProductStoreUtility } from '@angular-monorepo/product-store.utility';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreMid {
  private _api: ProductStoreApi = inject(ProductStoreApi);
  private _utility: ProductStoreUtility = inject(ProductStoreUtility);
  readonly store = inject(ProductsStore);
  readonly orderStore = inject(OrdersStore);

  // File Upladed value to sent product form
  fileUrlFinall = signal<string>('');

  constructor() {
    // Update file signal
    this.fileUrlFinall = this._utility.fileUrlFinall;
  }

  // get list with store by query
  getProductList$(query: string) {
    return this.store.loadByQuery(query);
  }

  // set store data to feat component
  store$() {
    return this.store;
  }

  // set store query filter data to feat component
  store_query$() {
    return this.store.filter.query();
  }

  // get new query data from feat and sent to store
  updateQuery(query: string) {
    this.store.updateQuery(query);
  }

  // get new product data from feat and sent to store for set api and change state
  insertProduct$(body: ProductModel) {
    this.store.addProduct(body);
  }

  // get edited product data from feat and sent to store for set api and change state
  updateProduct$(body: ProductModel) {
    this.store.updateProduct(body);
  }

  // get product id for remove from feat and sent to store for set api and change state
  removeProduct$(id: number) {
    this.store.removeProduct(id);
  }

  // get product form from utility service and sent to dialog
  getProductForm() {
    return this._utility.createProductForm();
  }

  // uploade file or image methode
  uploadImage(input: File | Event): void {
    return this._utility.handleFileInput(input);
  }

  onAddToCart(product: ProductModel) {
    this.orderStore.addToCart(product);
  }

  onRemoveFromCart(product: ProductModel) {
    this.orderStore.removeFromCart(product);
  }
}
