import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";
//import { CustomValidators } from '../shared/custom-validators';
import { UserLoginService, UserRegistrationService, CognitoCallback, LoggedInCallback } from "../service/cognito.service";
import { ValidateEmailDirective } from '../shared/validate-email.directive';

export class RegistrationUser {
    name: string;
    email: string;
    password: string;
}

@Component({
  selector: 'app-auth-pwd',
  templateUrl: './auth-pwd.component.html',
  styleUrls: ['./auth-pwd.component.css']
})

export class AuthPwdComponent implements CognitoCallback, LoggedInCallback, OnInit {
  authForm: FormGroup;
  signUpActive: string;
  signInActive: string;
  actiVationOn: string;
  forgotPwdOn : string;
  errorMessage: string;
  registrationUser: RegistrationUser;

  constructor(public router: Router,
              private formBuilder: FormBuilder, 
              public userService: UserLoginService, 
              public userRegistration: UserRegistrationService, 
              public regService: UserRegistrationService) {
    this.userService.isAuthenticated(this);          
    this.buildForm();
   }
 
 
  private buildForm(){
   this.authForm = this.formBuilder.group({

   		playerName: this.formBuilder.control(null,[
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(24)]),

   		email: this.formBuilder.control(null,[
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(40),
                        emailValidator(/bob/i)]),

   		password: this.formBuilder.control(null, [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(24)]),

      confCode: this.formBuilder.control(null,[
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(8)])

   });

   this.authForm.valueChanges
       .subscribe(data => this.onValueChanged(data));

   this.onValueChanged();

  }

  onValueChanged(data?: any){
      if (!this.authForm) { return; }
      const form = this.authForm;
      for (const field in this.formErrors){
          this.formErrors[field] = ''; // clear previous error message
          const control = form.get(field);
          if (control && control.dirty && !control.valid){
              const messages = this.validationMessages[field];
              for (const key in control.errors) {
                  this.formErrors[field] += messages[key] + ' ';
              }
          }
      }

  }

  formErrors = {
      'playerName':'',
      'email':'',
      'password':'',
      'confCode':'',
  };

  validationMessages = {
      'playerName': {
        'required':      'Name is required.',
        'minlength':     'Name must be at least 4 characters long.',
        'maxlength':     'Name cannot be more than 24 characters long.'
      },
      'email': {
        'required':      'Email is required.',
        'minlength':     'Email must be at least 4 characters long.',
        'maxlength':     'Email cannot be more than 24 characters long.'        
      },
      'password': {
        'required':      'Password is required.',
        'minlength':     'Password must be at least 8 characters long.',
        'maxlength':     'Password cannot be more than 24 characters long.'
      },
      'confCode': {
        'required':      'Confirmation code required.',
        'minlength':     'Confirmation code must be at least 8 characters long.',
        'maxlength':     'Confirmation code cannot be more than 24 characters long.'
      }

  };

  ngOnInit() {
    this.signUpActive = null;
    this.actiVationOn = null;
    this.errorMessage = null;
    this.errorMessage = null;
    this.signInActive = "on";
    this.authForm.reset();
    this.registrationUser = new RegistrationUser();
  }

  onResetForm(){
    this.authForm.reset();
  }

//Sign in function, Calls Cognito
  onSinginForm(){
    if (this.authForm.value.email == null || this.authForm.value.password == null) {
            this.errorMessage = "All fields are required";
            return;
    }    
    this.errorMessage = null;
    this.userService.authenticate(this.authForm.value.email, this.authForm.value.password, this);    
  }

  onNewPlayerForm(){
    this.signUpActive = 'on';
    console.log(this.authForm.value)
  }

//Sign Up function
  onAddPlayerForm(){
    this.actiVationOn = 'on';
    this.signInActive = null;
    this.errorMessage = null;
    this.registrationUser.name = this.authForm.value.playerName;
    this.registrationUser.email = this.authForm.value.email;
    this.registrationUser.password = this.authForm.value.password;
    console.log(this.registrationUser);
    this.userRegistration.register(this.registrationUser, this);
  }  

//Confirmation code
  onConfirmForm(){
    console.log(this.authForm.value.confCode);
    console.log(this.registrationUser.email);
    this.regService.confirmRegistration(this.registrationUser.email, this.authForm.value.confCode, this);
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
