import { Directive, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, NG_VALIDATORS } from '@angular/forms';

/** Email Validation Class */
export function emailValidator(emailRe: RegExp): ValidatorFn {	
	return (control: AbstractControl): { [key : string]: any } =>{
	const email = control.value;
	const no = emailRe.test(email);
	return no ? {'validEmail': { email }}:null;
	}
}

@Directive({
  selector: '[appValidateEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidateEmailDirective, multi: true}]
})
export class ValidateEmailDirective implements OnChanges {

  @Input() validEmail: string;	
  private valFn = Validators.nullValidator;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  const change = changes['validEmail'];
  if (change) {
  		const val: string | RegExp = change.currentValue;
  		const re = val instanceof RegExp ? val : new RegExp(val, 'i');
  		this.valFn = emailValidator(re);
  } else {
        this.valFn = Validators.nullValidator;
  }

  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }

}
