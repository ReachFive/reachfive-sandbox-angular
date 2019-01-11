import { Component, OnInit } from '@angular/core';
import { GivenAndFamilyName, IdentityService } from '../identity/identity.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  error: string | undefined;

  profile: GivenAndFamilyName = {
    givenName: '',
    familyName: ''
  };

  constructor(
    private identityService: IdentityService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  updateProfile() {
    this.identityService.updateProfile(this.profile).then(
      () => {
        this.snackBar.open('Profile successfully updated', 'Success', {
          duration: 3000
        });
      },
      err => this.error = err.errorUserMsg || 'Unexpected error occurred'
    );
  }

  ngOnInit(): void {
    this.identityService.userInfo('givenName,familyName')
      .then(user => this.profile = user)
      .catch(err => {
        console.error(err);
        this.router.navigate(['']);
      });
  }
}
