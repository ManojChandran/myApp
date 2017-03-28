import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { CognitoUtil, UserLoginService, UserRegistrationService } from "./service/cognito.service";

import { AppComponent } from './app.component';
import { AuthPwdComponent } from './auth-pwd/auth-pwd.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { NavBarComponent, LogoutComponent } from './nav-bar/nav-bar.component';
import { PwdForgotComponent } from './pwd-forgot/pwd-forgot.component';
import { ValidateEmailDirective } from './shared/validate-email.directive';

@NgModule({
  declarations: [
    AppComponent,
    AuthPwdComponent,
    AppHomeComponent,
    NavBarComponent,
    LogoutComponent,
    PwdForgotComponent,
    ValidateEmailDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    CognitoUtil,
    UserLoginService,
    UserRegistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
