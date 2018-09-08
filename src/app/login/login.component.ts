import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['user@gmail.com', Validators.required],
      password: ['password', Validators.required]
    });
  }

  login() {
    this.userService.login(this.loginForm.value)
      .subscribe(() => this.router.navigate(['/']));
  }
}
