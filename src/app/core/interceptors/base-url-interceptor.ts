import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@src/app/environments/environment';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AdminPageService } from '@src/app/features/admin-page/services/admin-page.service';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ withCredentials: true, url: environment.apiUrl + req.url })).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const adminPageService = inject(AdminPageService);
        adminPageService.logout();
      }
      console.error('Error happened', error);
      return throwError(() => error);
    }),
  );
};
