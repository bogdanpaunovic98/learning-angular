import { Router } from '@angular/router';
import { CheckLoginService } from '@src/app/shared/services/check-login.service';
import { catchError, map, of } from 'rxjs';

export const redirectLoggedInUser = (router: Router, checkLoginService: CheckLoginService) => {
  return checkLoginService.getLoggedInUserInfo().pipe(
    catchError(() => of(null)),
    map((data) => {
      const role = data?.role;

      if (!role) router.navigate(['/authenticate']);
      else {
        const redirectPath = role === 'ADMINISTRATOR' ? '/admin-page' : '/user-page';
        router.navigate([redirectPath]);
      }
    }),
  );
};
