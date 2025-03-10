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
  withMethods((store) => ({
    // Announce to OrdersStore (update cart items count)
    updateProduct: (headerData: {
      orderCount: number;
      totalAmount: number;
    }) => {
      patchState(store, {
        orderCount: headerData.orderCount,
        totalAmount: headerData.totalAmount,
      });
    },
  }))
);
