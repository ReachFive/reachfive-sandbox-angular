import { Component, OnInit } from '@angular/core';
import { IdentityService, LoginCredentials } from '../identity/identity.service';

class FormData implements LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private identityService: IdentityService
  ) { }

  error: string | undefined;

  data: FormData = {
    email: '',
    password: '',
  };

  login() {
    this.identityService
      .login(this.data)
      .then(
        () => console.log('Success'),
        (err) => {
          console.log(err);
          this.error = err.errorUserMsg || 'Unexpected error occurred';
        }
      );
  }
}
