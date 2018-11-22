import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent implements OnInit {
  user: User;

  constructor(private http: HttpClient,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.http.get<User>('/api/users/current')
      .subscribe(user => this.user = user);
  }

  updated(user: User) {
    this.http.put<User>('/api/users/current', user)
      .subscribe(u => {
        this.user = u;
        this.toastr.success('Your profile has been updated!');
      });
  }
}
