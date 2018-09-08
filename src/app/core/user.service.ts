import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
  token?: string;
  username?: string;

  constructor(private http: HttpClient) {
    this.username = window.localStorage.getItem('email');
    this.token = window.localStorage.getItem('token');
  }

  login(loginCommand: any): Observable<string> {
    return this.http.post<any>('/api/users/token', loginCommand)
      .pipe(
        map(tokenDto => tokenDto.token),
        map(token => {
          window.localStorage.setItem('email', loginCommand.username);
          window.localStorage.setItem('token', token);
          this.token = token;
          this.username = loginCommand.username;
          return token;
        }));
  }

  loggedIn(): boolean {
    return this.token && this.username && true;
  }

  logout(): Observable<string> {
    return Observable.create((observer) => {
      const username = this.username;
      this.username = null;
      this.token = null;
      window.localStorage.removeItem('email');
      window.localStorage.removeItem('token');
      observer.next(username);
      observer.complete();
    });
  }
}
