import { Router, Routes } from '@angular/router';
import { adminPageGuard } from '@src/app/features/admin-page/guards/admin-page.guard';
import { SettingsPageComponent } from '@src/app/features/admin-page/components/settings-page/settings-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin-page',
    pathMatch: 'full',
  },
  {
    title: 'Authenticate',
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
    ],
  },
];
