import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CognitoCallback, UserLoginService } from "../service/cognito.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-pwd-forgot',
  templateUrl: './pwd-forgot.component.html',
  styleUrls: ['./pwd-forgot.component.css']
})

export class PwdForgotComponent implements OnInit {
	frgtPwdForm: FormGroup;
	errorMessage: string;
	frgtPwdActive: string;
	resetPwdActive: string;

  constructor( public router: Router,
               private formBuilder: FormBuilder,
               public userService: UserLoginService ) { 
  	this.buildForm();
  }

  ngOnInit() {
  	this.frgtPwdActive = 'on';
  	this.resetPwdActive = null;
  }

  private buildForm(){
   this.frgtPwdForm = this.formBuilder.group({

   		email: this.formBuilder.control(null,[
                        Validators.required]),

   		password: this.formBuilder.control(null, [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(24)]),

      confCode: this.formBuilder.control(null,[
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(8)])

   });

   this.frgtPwdForm.valueChanges
       .subscribe(data => this.onValueChanged(data));

   this.onValueChanged();

  }

  onValueChanged(data?: any){
      if (!this.frgtPwdForm) { return; }
      const form = this.frgtPwdForm;
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
      'email':'',
      'password':'',
      'confCode':'',
  };

  validationMessages = {
      'email': {
        'required':      'Email is required.',
      },
      'password': {
        'required':      'Password is required.',
        'minlength':     'Password must be at least 8 characters long.',
        'maxlength':     'Password cannot be more than 24 characters long.'
      },
      'confCode': {
        'required':      'Confirmation code required.',
        'minlength':     'Confirmation code must be at least 6 characters long.',
        'maxlength':     'Confirmation code cannot be more than 6 characters long.'
      }

  };

  onNextForm(){
    console.log(this.frgtPwdForm.value);
    this.userService.forgotPassword(this.frgtPwdForm.value.email, this);
  }

  onSubmitForm(){
   console.log(this.frgtPwdForm.value);
   this.userService.confirmNewPassword(this.frgtPwdForm.value.email, this.frgtPwdForm.value.confCode, this.frgtPwdForm.value.password, this);
  }

  cognitoCallback(message: string, result: any) {
        if (message != null) { //error
            this.errorMessage = message;
        } else if (this.frgtPwdActive == 'on'){
             this.frgtPwdActive = null;
             this.resetPwdActive = 'on';                     
        } else {
              console.log('success');
              this.router.navigate(['/home']);
        }
  }

}
