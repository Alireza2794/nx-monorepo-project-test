import { OrdersStore } from '@angular-monorepo/layout-store.state';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutStoreMid {
  readonly store = inject(OrdersStore);

  // get list with store
  // getOrderList$() {
  //   return this.store.loadAll();
  // }

  // set store data to feat component
  store$() {
    return this.store;
  }
}
