import { LayoutStoreApi } from '@angular-monorepo/layout-store.api';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type OrdersState = {
  orderCount: number;
  totalAmount: number;
  isLoading: boolean;
};

const initialState: OrdersState = {
  orderCount: 0,
  totalAmount: 0,
  isLoading: false,
};

export const OrdersStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withMethods((store, api = inject(LayoutStoreApi)) => ({
    // Update cart header (this will be called by ProductsStore)
    updateCartHeader: (headerData: {
      orderCount: number;
      totalAmount: number;
    }) => {
      // Update cart header information in layout store
      patchState(store, {
        orderCount: headerData.orderCount,
        totalAmount: headerData.totalAmount,
      });

      // Optionally, fetch order data from API for further processing
      api
        .getCartData$()
        .pipe(
          tapResponse({
            next: (orders) =>
              patchState(store, {
                orderCount: orders.totalCount,
                totalAmount: orders.totalAmount,
              }),
            error: (error: HttpErrorResponse) => console.log(error.message),
            finalize: () => patchState(store, { isLoading: false }),
          })
        )
        .subscribe();
    },
  }))
);
