import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
  currentUser?: User;
  token?: string;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(window.localStorage.getItem('user'));
    this.token = window.localStorage.getItem('token');
  }

  login(loginCommand: any): Observable<string> {
    return this.http.post<any>('/api/users/token', loginCommand)
      .pipe(
        map(tokenDto => {
          this.token = tokenDto.token;
          this.currentUser = { id: tokenDto.id, email: tokenDto.email };
          window.localStorage.setItem('user', JSON.stringify(this.currentUser));
          window.localStorage.setItem('token', tokenDto.token);
          return tokenDto;
        }));
  }

  loggedIn(): boolean {
    return this.token && this.currentUser && true;
  }

  logout(): Observable<string> {
    return Observable.create((observer) => {
      const user = this.currentUser;
      this.currentUser = null;
      this.token = null;
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      observer.next(user);
      observer.complete();
    });
  }

  register(registerCommand) {
    return this.http.post<any>('/api/users', registerCommand);
  }
}
