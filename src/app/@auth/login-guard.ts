import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivateViaLoginGuard implements CanActivate {

   constructor(private authService: AuthService, private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      // if (this.authService.isRole('ROLE_SYSTEM')) {
      //    this.router.navigate(['/login-system'], { replaceUrl: true });
      //    return false;
      // } else {
      return true;
      // }
   }
}
