import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.userService.token;

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken
        }
      });
    }
    return next.handle(request);
  }
}
