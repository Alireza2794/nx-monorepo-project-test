import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  },
  {
    path: 'product',
    loadChildren: () =>
      import('@angular-monorepo/feat-product-store').then(
        (m) => m.featProductStoreRoutes
      ),
  },
];
