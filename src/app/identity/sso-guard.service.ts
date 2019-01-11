import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root'
})
export class SsoGuardService implements CanActivate {

  constructor(
    private identityService: IdentityService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (this.identityService.isAuthenticated()) {
      this.router.navigate(['myaccount']);
      return false;
    } else {
      // If an active sso session exists, the user will be redirected by the `checkSsoSession` method.
      return this.identityService.checkSsoSession().then(() => true);
    }
  }
}
