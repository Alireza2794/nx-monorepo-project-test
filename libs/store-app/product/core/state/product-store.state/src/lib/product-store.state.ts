import { ProductStoreApi } from '@angular-monorepo/product-store.api';
import {
  OrdersModel,
  ProductModel,
} from '@angular-monorepo/product-store.model';
import { CartStore } from '@angular-monorepo/store-main.state';
import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
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
      return products().toSorted((a, b) => direction * (a.price - b.price));
      // return products().toSorted(
      //   (a, b) => direction * a.price.localeCompare(b.price)
      // );
    }),
  })),

  // Methods
  withMethods(
    (store, api = inject(ProductStoreApi), snackBar = inject(MatSnackBar)) => {
      const updateProductsState = (newProducts: ProductModel[]) => {
        patchState(store, { products: newProducts });
      };

      const toast = (message: string) => {
        snackBar.open(message, 'OK', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      };

      return {
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
          api.insertProduct$(product).subscribe(
            (res) => {
              // update store
              const newProducts = [...store.products(), res.data];
              updateProductsState(newProducts);

              toast(res.message);
            },
            (err) => {
              toast(err.error.message);
            }
          );
        },

        //For update product
        updateProduct: (product: ProductModel) => {
          // sent to api
          api.updateProduct$(product).subscribe(
            (res) => {
              // update store
              const newProducts = store
                .products()
                .map((p) => (p.id === product.id ? { ...p, ...product } : p));
              updateProductsState(newProducts);

              toast(res.message);
            },
            (err) => {
              toast(err.error.message);
            }
          );
        },

        // For remove product
        removeProduct: (id: number) => {
          // sent to api
          api.removeProduct$(id).subscribe(
            (res) => {
              // update store
              const newProducts = store.products().filter((p) => p.id !== id);
              updateProductsState(newProducts);

              toast(res.message);
            },
            (err) => {
              toast(err.error.message);
            }
          );
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
                  next: (response) =>
                    patchState(store, { products: [...response.data] }),
                  error: (error: HttpErrorResponse) =>
                    console.log(error.message),
                  finalize: () => patchState(store, { isLoading: false }),
                })
              );
            })
          )
        ),
      };
    }
  )
);

export const OrdersStore = signalStore(
  { providedIn: 'root' },

  withState(initialOrderState),

  withMethods(
    (
      store,
      api = inject(ProductStoreApi),
      cartStore = inject(CartStore),
      snackBar = inject(MatSnackBar)
    ) => {
      // help function for update cart state
      const updateCartState = (updatedCartItems: ProductModel[]) => {
        const updatedTotalAmount = updatedCartItems.reduce(
          (sum, item) => sum + item.price,
          0
        );
        const updatedOrderCount = updatedCartItems.length;

        const orders = {
          Items: updatedCartItems,
          totalAmount: updatedTotalAmount,
          totalCount: updatedOrderCount,
        };

        return orders;
      };

      // sync cart in state
      const syncCartToStore = (orders: OrdersModel) => {
        patchState(store, { orders });

        const headerData = {
          orderCount: orders.totalCount,
          totalAmount: orders.totalAmount,
        };

        cartStore.updateProduct(headerData);
      };

      const toast = (message: string) => {
        snackBar.open(message, 'OK', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      };

      return {
        // Add product to cart
        addToCart: (product: ProductModel) => {
          const updatedCartItems = [...store.orders().Items, product];
          const orders = updateCartState(updatedCartItems);

          api.updateCart$(orders).subscribe(
            (res) => {
              syncCartToStore(orders);
              toast(res.message);
            },
            (err) => {
              toast(err.error.message);
            }
          );
        },

        // Remove product to cart
        removeFromCart: (product: ProductModel) => {
          const updatedCartItems = store
            .orders()
            .Items.filter((item) => item.id !== product.id);
          const orders = updateCartState(updatedCartItems);

          api.updateCart$(orders).subscribe(
            (res) => {
              syncCartToStore(orders);
              toast(res.message);
            },
            (err) => {
              toast(err.error.message);
            }
          );
        },

        // get Cart Data
        getCartData: () => {
          api.getCartData$().subscribe((res) => {
            const orders = updateCartState(res.data.Items);
            syncCartToStore(orders);
          });
        },
      };
    }
  )
);
