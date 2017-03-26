import { Component, OnInit } from '@angular/core';
import { CognitoCallback, UserLoginService, LoggedInCallback } from "../service/cognito.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit, LoggedInCallback {

  errorMessage: string;

  constructor( public router: Router, 
  			   public userService: UserLoginService,) {
  	this.userService.isAuthenticated(this);
  }

  ngOnInit() {
  }

  cognitoCallback(message: string, result: any) {
        if (message != null) { //error
            this.errorMessage = message;
        } else { //success
          console.log('success');
          this.router.navigate(['/home']);
        }
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn){
          console.log('success');
          this.router.navigate(['/home']);      

        } else {
          this.router.navigate(['/auth']);
        }
  } 

}
