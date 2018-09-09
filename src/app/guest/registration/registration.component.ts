import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../../core/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

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
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: [this.route.snapshot.queryParams['email'] || '', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      password2: ['', Validators.required]
    }, {validator: this.passwordsIncorrect});
  }

  register() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.registrationForm.disable();
    this.userService.register(this.registrationForm.value)
      .pipe(catchError(() => {
        this.registrationForm.enable();
        return EMPTY;
      }))
      .subscribe(() => {
        this.toastr.success('Successfully registered!');
        this.router.navigate(['/', 'guest'], {queryParams: {email: this.registrationForm.get('email').value}});
      });
  }

  passwordsIncorrect = (form: AbstractControl) => {
    if (form.get('password').value !== form.get('password2').value) {
      return {'invalidConfirmation': true};
    }
  }
}
