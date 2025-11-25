import { Routes } from '@angular/router';
import { adminPageGuard } from '@src/app/features/admin-page/guards/admin-page.guard';
import { UserProducts } from '@src/app/features/user-page/components/products/components/products/products.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin-page',
    pathMatch: 'full',
  },
  {
    path: 'authenticate',
    loadComponent: () =>
      import('@src/app/features/auth/components/auth-container/auth-container.component').then(
        (c) => c.AuthContainer,
      ),
  },
  {
    path: 'admin-page',
    loadComponent: () =>
      import('@src/app/features/admin-page/components/admin-page/admin-page.component').then(
        (c) => c.AdminPage,
      ),
    canActivate: [adminPageGuard],
    children: [
      {
        path: 'settings',
        loadComponent: () =>
          import(
            '@src/app/features/admin-page/components/settings-page/settings-page.component'
          ).then((c) => c.SettingsPageComponent),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import(
            '@src/app/features/admin-page/components/analytics-page/analytics-page.component'
          ).then((c) => c.AnalyticsPageComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import(
            '@src/app/features/admin-page/components/products/components/products/products.component'
          ).then((c) => c.Products),
      },
    ],
  },
  {
    path: 'user-page',
    loadComponent: () =>
      import('@src/app/features/user-page/components/user-page/user-page.component').then(
        (c) => c.UserPage,
      ),
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import(
            '@src/app/features/user-page/components/products/components/products/products.component'
          ).then((c) => c.UserProducts),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import(
            '@src/app/features/user-page/components/products/components/product-overview/product-overview.component'
          ).then((c) => c.ProductOverviewComponent),
      },
    ],
  },
];
