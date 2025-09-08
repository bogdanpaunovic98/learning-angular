import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Login',
    path: 'login',
    loadComponent: () =>
      import('@src/features/auth/components/auth-container/auth-container.component').then(
        (c) => c.AuthContainer,
      ),
  },
];
