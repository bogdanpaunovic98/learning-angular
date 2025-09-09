import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@src/app/environments/environment';
import { catchError, throwError } from 'rxjs';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ withCredentials: true, url: environment.apiUrl + req.url })).pipe(
    catchError((error: Object) => {
      console.error('Error happened', error);
      return throwError(() => error);
    }),
  );
};
