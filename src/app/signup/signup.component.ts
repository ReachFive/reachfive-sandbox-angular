import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../identity/identity.service';

class FormData {
  givenName: string;
  familyName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private identityService: IdentityService) { }

  data: FormData = {
    givenName: '',
    familyName: '',
    email: '',
    password: '',
  };

  error: string | undefined;

  signup() {
    this.identityService
      .signup(this.data)
      .then(
        () => console.log('Success'),
        (err) => {
          console.log(err);
          this.error = err.errorUserMsg || 'Unexpected error occurred';
        }
      );
  }

  ngOnInit() {
  }

}
