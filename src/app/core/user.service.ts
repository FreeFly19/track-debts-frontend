import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
  token?: string;
  email?: string;

  constructor(private http: HttpClient) {
    this.email = window.localStorage.getItem('email');
    this.token = window.localStorage.getItem('token');
  }

  login(loginCommand: any): Observable<string> {
    return this.http.post<any>('/api/users/token', loginCommand)
      .pipe(
        map(tokenDto => tokenDto.token),
        map(token => {
          window.localStorage.setItem('email', loginCommand.email);
          window.localStorage.setItem('token', token);
          this.token = token;
          this.email = loginCommand.email;
          return token;
        }));
  }

  loggedIn(): boolean {
    return this.token && this.email && true;
  }

  logout(): Observable<string> {
    return Observable.create((observer) => {
      const email = this.email;
      this.email = null;
      this.token = null;
      window.localStorage.removeItem('email');
      window.localStorage.removeItem('token');
      observer.next(email);
      observer.complete();
    });
  }

  register(registerCommand) {
    return this.http.post<any>('/api/users', registerCommand);
  }
}
