import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CheckLoginService } from '@src/app/shared/services/check-login.service';
import { catchError, map, of } from 'rxjs';

export const adminPageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const checkLoginService = inject(CheckLoginService);

  return checkLoginService.checkLogin().pipe(
    catchError(() => of(null)),
    map((data) => {
      return data ? true : new RedirectCommand(router.parseUrl('/authenticate'));
    }),
  );
};
