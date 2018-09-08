import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from './user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './token-interceptor';
import {GuestGuard} from './guest.guard';
import {UserGuard} from './user.guard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    UserGuard,
    GuestGuard,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
