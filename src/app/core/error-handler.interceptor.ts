import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, of, throwError} from 'rxjs';

import {ToastrService} from 'ngx-toastr';

import {catchError, map} from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(err => {
        if (!(err instanceof HttpErrorResponse)) { return throwError(err); }

        if (err.status === 0) {
          this.toastr.error('There is no Internet Connection', 'Error');
        } else if (err.status === 400) {
          this.toastr.error(err.error.message, 'Error');
        } else if (err.status === 401) {
          this.toastr.error('Unauthorized', 'Error');
        } else if (err.status === 403) {
          this.toastr.error('Access Forbidden', 'Error');
        } else if (err.status === 404) {
          this.toastr.error('Not Found', 'Error');
        } else if (err.status === 500) {
          this.toastr.error('Server raised error, please notify support team', 'Error');
        } else if (err.status === 504) {
          this.toastr.error('Backend server is unreachable', 'Error');
        }

        return throwError(err);
      }));
  }
}
