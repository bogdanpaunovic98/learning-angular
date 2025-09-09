import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@src/app/environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ withCredentials: true, url: environment.apiUrl + req.url }));
};
