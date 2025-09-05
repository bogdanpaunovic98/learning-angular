import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@src/environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.clone({
      url: environment.apiUrl + req.url,
    }),
  );
};
