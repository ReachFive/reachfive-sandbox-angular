import { Component, OnInit } from '@angular/core';
import { IdentityService } from './identity/identity.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean | undefined;

  constructor(private identityService: IdentityService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated = this.identityService.isAuthenticated();
      }
    });
  }

  logout() {
    this.identityService.logout();
  }
}
