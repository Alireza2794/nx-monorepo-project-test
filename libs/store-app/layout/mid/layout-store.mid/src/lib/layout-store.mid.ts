import { CartStore } from '@angular-monorepo/store-main.state';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutStoreMid {
  readonly store = inject(CartStore);

  // set store data to feat component
  store$() {
    return this.store;
  }
}
