import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthPwdComponent } from './auth-pwd/auth-pwd.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { LogoutComponent } from './nav-bar/nav-bar.component';
import { PwdForgotComponent } from './pwd-forgot/pwd-forgot.component';

export const appRoutes: Routes = [
  { path: 'auth', component: AuthPwdComponent },
  { path: 'home', component: AppHomeComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'frgtpwd', component: PwdForgotComponent},
  { path: '**',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}