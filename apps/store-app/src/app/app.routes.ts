import { FeatLayoutStoreComponent } from '@angular-monorepo/feat-layout-store';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FeatLayoutStoreComponent,
    children: [
      {
        path: 'product',
        loadChildren: () =>
          import('@angular-monorepo/feat-product-store').then(
            (m) => m.featProductStoreRoutes
          ),
      },
    ],
  },
];
