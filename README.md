# AWS Cognito

This project is a login solution created with Angular 2 and AWS Cognito.

# Amazon Cognito

Amazon Cognito lets you easily add user sign-up and sign-in to your mobile and web apps. With Amazon Cognito, you also have the options to authenticate users through social identity providers such as Facebook, Twitter, or Amazon, with SAML identity solutions, or by using your own identity system. In addition, Amazon Cognito enables you to save data locally on users devices, allowing your applications to work even when the devices are offline. You can then synchronize data across users devices so that their app experience remains consistent regardless of the device they use.

# Cognito SDK

	1. Use npm to istall SDK 
	   npm install --save amazon-cognito-identity-js
	   npm install --save amazon-cognito-identity.min.js

	2. Download and files jsbn.js, sbn2.js and sjcl.js in assets/js

	3. Update Angular-CLI, scripts array as below

	"scripts": [
        "assets/js/jsbn.js",
        "assets/js/jsbn2.js",
        "assets/js/sjcl.js",
        "../node_modules/amazon-cognito-identity-js/dist/aws-cognito-sdk.min.js",
        "../node_modules/amazon-cognito-identity-js/dist/amazon-cognito-identity.min.js"
      ],
	

# Bootstrap 4

The options above will work, however I use this approach via NPM:
	1. Navigate to: Bootstrap 4 and retrieve the npm command
	
	2. Run the NPM command obtained from step 1 in your project 
	i.e npm install bootstrap@4.0.0-alpha.5 --save	
	npm install bootstrap@next --save

	3. After installing the above dependencie run the following npm command which will install the bootstrap module 
	npm install --save @ng-bootstrap/ng-bootstrap
	4. Add the following import into app.module import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; and add NgbModule to the imports
	
	5. Your app module will look like this:
    import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

	@NgModule({
	   declarations: [
	   AppComponent,
	   WeatherComponent
	],
	  imports: [
	  BrowserModule,
	  FormsModule,
	  HttpModule,
	  NgbModule.forRoot(), // Add Bootstrap module here.
	],
	  providers: [],
	  bootstrap: [AppComponent]
	})

	export class AppModule { }

	6. Open angular-cli.json and insert a new entry into the styles array :
	"styles": [
	  "styles.css",
	   "../node_modules/bootstrap/dist/css/bootstrap.min.css"
	],


# MyApp

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.26.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
