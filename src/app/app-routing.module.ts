import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuardService } from './identity/auth-guard.service';
import { SsoGuardService } from './identity/sso-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [SsoGuardService] },
  { path: 'signup', component: SignupComponent, canActivate: [SsoGuardService] },
  { path: 'callback', component: CallbackComponent },
  { path: 'myaccount', component: UserComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
