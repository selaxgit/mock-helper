import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ErrorService } from '../common/services';

export const ErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  errorService: ErrorService = inject(ErrorService),
) => {
  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      switch (e.status) {
        case HttpStatusCode.BadRequest:
          errorService.showError(e.error.message, e.error?.errors || []);
          break;
        case HttpStatusCode.InternalServerError:
          errorService.showError(e.statusText, [e.message]);
          break;
        default:
          errorService.showError(e.error?.message ?? e.message, []);
      }
      return throwError(() => e);
    }),
  );
};
