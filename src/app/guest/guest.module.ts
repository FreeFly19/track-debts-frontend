import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent}
    ])
  ],
  declarations: [LoginComponent, RegistrationComponent]
})
export class GuestModule { }
