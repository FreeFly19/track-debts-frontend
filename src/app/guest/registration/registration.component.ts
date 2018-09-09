import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../guest.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: [this.route.snapshot.queryParams['email'] || '', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    }, this.passwordConfirming);
  }

  register() {
    this.userService.register(this.registrationForm.value)
      .subscribe(() => {
        this.toastr.success('Successfully registered!');
        this.router.navigate(['/', 'guest']);
      });
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('password2').value) {
      return {invalid: true};
    }
  }
}
