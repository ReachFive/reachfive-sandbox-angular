import { Injectable } from '@angular/core';
import { AuthOptions, AuthResult, createClient } from '@reachfive/identity-core';
import { IDENTITY_CONFIG } from './identity-config';
import { Router } from '@angular/router';

export interface EmailField {
  email: string;
}

export interface PasswordField {
  password: string;
}

export interface NameField {
  name: string;
}

export interface GivenAndFamilyName {
  givenName?: string;
  familyName?: string;
}

export interface LoginCredentials extends EmailField, PasswordField {}

export interface ProfileSignup extends GivenAndFamilyName, EmailField, PasswordField {}

export interface ProfileRead extends GivenAndFamilyName, NameField, EmailField {}

export type ProfileEdit = GivenAndFamilyName;

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private userInfoCache: ProfileRead | undefined

  private client = createClient({
    domain: IDENTITY_CONFIG.domain,
    clientId: IDENTITY_CONFIG.clientId,
    language: 'en',
  });

  private authOptions: AuthOptions = {
    redirectUri: IDENTITY_CONFIG.redirectUri,
    responseType: 'token'
  };

  constructor(private router: Router) {
    this.client.on('authenticated', this.handleAuthenticated);
    this.client.on('authentication_failed', this.handleAuthenticationFailed);
  }

  private handleAuthenticated = (authResult: AuthResult) => {
    this.saveSession(authResult);
    this.router.navigate(['myaccount']);
  };

  private handleAuthenticationFailed(err: any) {
    console.error(err);
    this.router.navigate(['']);
  }

  login(credentials: LoginCredentials) {
    return this.client.loginWithPassword({
      ...credentials,
      auth: this.authOptions
    });
  }

  checkSsoSession(): Promise<void> {
    return this.client.checkSession().then(
      this.handleAuthenticated,
      (err) => {
        if (err.error !== 'login_required') {
          console.error(err);
        }
      }
    )
  }

  signup(userInfo: ProfileSignup) {
    return this.client.signup({
      data: userInfo,
      auth: this.authOptions
    });
  }

  updateProfile(profile: ProfileEdit): Promise<void> {
    return this.client.updateProfile({
      accessToken: this.getAccessToken(),
      data: profile
    });
  }

  userInfo(fields: string): Promise<ProfileRead> {
    return this.client.getUser({
      accessToken: this.getAccessToken(),
      fields
    }).then(profile => {
      this.userInfoCache = profile as ProfileRead;
      return this.userInfoCache;
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    this.client.logout().catch(err => console.error(err));
  }

  isAuthenticated(): boolean {
    const expiresAtRaw = localStorage.getItem('expires_at');
    return expiresAtRaw ? new Date().getTime() < JSON.parse(expiresAtRaw) : false;
  }

  private saveSession(authResult: AuthResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime()));
  }

  private getAccessToken() {
    return localStorage.getItem('access_token');
  }
}
