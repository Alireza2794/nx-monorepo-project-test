import { LayoutStoreApi } from '@angular-monorepo/layout-store.api';
import { ProductStoreApi } from '@angular-monorepo/product-store.api';
import {
  OrdersModel,
  ProductModel,
} from '@angular-monorepo/product-store.model';
import { CartStore } from '@angular-monorepo/store-main.state';
import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { removeEntity, updateEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

type ProductsState = {
  products: ProductModel[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

type OrdersState = {
  orders: OrdersModel;
  isLoading: boolean;
};

const initialOrderState: OrdersState = {
  orders: {
    totalCount: 0,
    totalAmount: 0,
    Items: [],
  },
  isLoading: false,
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },

  // Set by first state
  withState(initialState),
  withComputed(({ products, filter }) => ({
    productsCount: computed(() => products().length),
    sortedproducts: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return products().toSorted(
        (a, b) => direction * a.title.localeCompare(b.title)
      );
    }),
  })),

  // Methods
  withMethods((store, api = inject(ProductStoreApi)) => ({
    // For upadate query filter
    updateQuery(query: string): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, query },
      }));
    },

    // For upadate sort by order filter
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, order },
      }));
    },

    // For add product
    addProduct(product: ProductModel): void {
      // sent to api
      api.insertProduct$(product);
      // update store
      patchState(store, { products: [...store.products(), product] });
    },

    //For  update product
    updateProduct: (product: ProductModel) => {
      // sent to api
      api.updateProduct$(product);
      // update store
      updateEntity({
        id: product.id,
        changes: (item) => (item = product),
      });

      const allItems = [...store.products()];
      const index = allItems.findIndex((x) => x.id === product.id);
      allItems[index] = product;

      patchState(store, {
        products: allItems,
      });
    },

    // For remove product
    removeProduct: (id: number) => {
      // sent to api
      api.removeProduct$(id);

      // update store
      removeEntity(id);
      patchState(store, {
        products: [...store.products().filter((x) => x.id !== id)],
      });
    },

    // Load data From Api by query
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          return api.getProductData$(query).pipe(
            tapResponse({
              next: (products) => patchState(store, { products: products }),
              error: (error: HttpErrorResponse) => console.log(error.message),
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  }))
);

export const OrdersStore = signalStore(
  { providedIn: 'root' },

  // Set by first state
  withState(initialOrderState),
  // Methods
  withMethods(
    (store, api = inject(ProductStoreApi), cartStore = inject(CartStore)) => ({
      // Add product to cart
      addToCart: (product: ProductModel) => {
        const updatedCartItems = [...store.orders().Items, product];
        const updatedTotalAmount = updatedCartItems.reduce(
          (sum, item) => sum + Number(item.price),
          0
        );
        const updatedOrderCount = updatedCartItems.length;

        const orders = {
          Items: updatedCartItems,
          totalAmount: updatedTotalAmount,
          totalCount: updatedOrderCount,
        };
        // Update local cart state
        patchState(store, {
          orders: orders,
        });

        // Sync product state to main store (ProductStore)
        api.addToCart$(orders);

        const headerData = {
          orderCount: updatedOrderCount,
          totalAmount: updatedTotalAmount,
        };

        // Sync cart data to layout store to update header
        cartStore.updateProduct(headerData);
      },
    })
  )
);
