import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (AuthService.isLogged()) {
      const user = AuthService.getLoggedUser().data;
      if (!user.isVerified) {
        this.router.navigate(['/verify-pin', user.phone]);
        return false;
      }
      return true;
    }

    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
    this.router.navigate(['/sign-in']);
    return false;
  }
}
