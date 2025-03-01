import { ProductModel } from '@angular-monorepo/product-store.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';

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

  getProductData$() {
    return of(this.data);
  }

  insertProduct$(body: ProductModel) {
    this.data.push(body);
  }
}
