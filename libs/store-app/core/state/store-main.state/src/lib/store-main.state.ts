import { OrdersStore } from '@angular-monorepo/layout-store.state';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type CartState = {
  totalAmount: number;
  orderCount: number;
};

const initialCartState: CartState = {
  totalAmount: 0,
  orderCount: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },

  // Set by first state
  withState(initialCartState),

  // Methods
  withMethods((store, layoutStore = inject(OrdersStore)) => ({
    // Announce to OrdersStore (update cart items count)
    updateProduct: (headerData: {
      orderCount: number;
      totalAmount: number;
    }) => {
      layoutStore.updateCartHeader(headerData);

      patchState(store, {
        orderCount: headerData.orderCount,
        totalAmount: headerData.totalAmount,
      });
    },
  }))
);
