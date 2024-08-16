import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { CookieService } from '@core/services/cookie/cookie.service';

export const headerInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  cookieService = inject(CookieService)
) => {
  const cookieObject = cookieService.parse();

  return next(
    request.clone({
      setHeaders: {
        accessToken: cookieObject['accessToken'],
      },
    })
  );
};
