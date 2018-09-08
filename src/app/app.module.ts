import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {CoreModule} from './core/core.module';
import {GuestGuard} from './core/guest.guard';
import {UserGuard} from './core/user.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: '', loadChildren: './home/home.module#HomeModule', canActivate: [UserGuard]},
      {path: 'login', loadChildren: './login/login.module#LoginModule', canActivate: [GuestGuard]},
      {path: '**', redirectTo: '/'}
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
