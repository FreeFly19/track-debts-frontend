import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.loggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
