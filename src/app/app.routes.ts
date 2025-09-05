import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Login',
    path: 'login',
    loadComponent: () =>
      import('@src/features/auth/components/login/login.component').then((c) => c.Login),
  },
];
