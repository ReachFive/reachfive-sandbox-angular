# ReachFive Angular Sandbox

ReachFive integration example with Angular.

This sandbox use the [NPM SDK](`https://github.com/ReachFive/identity-web-core-sdk`), 
and gives an example of SSO implementation.

## Config

Copy `./src/app/identity/identity-config.ts.example` to `./src/app/identity/identity-config.ts`, 
and replace `{DOMAIN}` and `{CLIENT_ID}` placeholders by your ReachFive's account domain and client id.

## Run

Run `ng serve` for a dev server. 
Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## File structure

 * `./src/app/login` 
   
Page component displaying the login page

 * `./src/app/signup`
 
Page component displaying the signup page

 * `./src/app/user`
 
Page component displaying a profile edit form (only accessible if the user is logged in).

 * `./src/app/callback`

Page component used to handle authentication redirect.

 * `./src/app/identity/identity.service.ts`
 
ReachFive's Identity SDK wrapper which expose all user and authentication related commands.

 * `./src/app/identity/auth-guard.service.ts`
 
Service guard ensuring that the current user is logged in. 
Must be added on all authenticated routes.

 * `./src/app/identity/sso-guard.service.ts`
 
Service guard ensuring that the current user has local or SSO active session. 
Must be added on login and signup routes.
