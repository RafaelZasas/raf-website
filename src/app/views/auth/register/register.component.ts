import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/Auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidator} from '../../../form-validators/authentication.validator';
import M from 'Materialize-css';
import * as firebase from 'firebase/app';
// Add the Performance Monitoring library
import 'firebase/performance';
import 'firebase/analytics';
import {AngularFirestore} from '@angular/fire/firestore';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {


  google = faGoogle;
  analytics = firebase.analytics();
  perf = firebase.performance(); // initializes the firebase performance module
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened
  registerForm: FormGroup;

  constructor(public auth: AuthService, private fb: FormBuilder, private afs: AngularFirestore) {
  }

  ngOnInit(): void {

    this.screenTrace = this.perf.trace('loginScreen'); // trace name = loginScreen for tracking in FB
    this.screenTrace.start(); // start the timer

    // Init the data to be collected and validate
    // FORM GROUP FOR THE USER DATA
    const userData = this.fb.group({
      username: new FormControl('', [Validators.required],
        [CustomValidator.usernameAvailability(this.afs)]),
      email: new FormControl('',
        [Validators.required, Validators.email],
        [CustomValidator.emailRegistration(this.afs)]),
    });

    // FORM GROUP FOR THE USER PASSWORDS
    const userPasswords = this.fb.group({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),

      password2: new FormControl('', [
        Validators.required,
      ])
    });

    this.registerForm = this.fb.group({

      userData, //   user data form group
      userPasswords // Passwords form group
    });


  }

  onSubmit() {
    const trace = this.perf.trace('userRegistration'); // Track how long it takes users to log in
    trace.start();

    if (this.registerForm.valid) { // check if the form is valid
      // provide credentials for email login service
      this.auth.emailRegistration(
        this.email.value,
        this.password.value,
        this.username.value
      ).then(r => {
        this.analytics.logEvent('authService', {serviceName: 'User Registration'});
        M.toast({html: `Hey ${this.username.value}, Thanks for signing up!`, classes: 'rounded blue'});
      })
        .catch(err => {
          trace.putAttribute('errorCode', err.code); // log the error to performance monitoring
        });
      // if the user hasn't filled out correctly
    } else {
      console.log('Please fill out form correctly');
    }
    trace.stop();
  }

  /*
  GETTERS SECTION FOR ACCESSING INDIVIDUAL FORM ELEMENTS WITHIN THE DOM
   */

  get username() {
    return this.registerForm.get('userData.username');
  }

  get email() {
    return this.registerForm.get('userData.email');
  }

  get password() {
    return this.registerForm.get('userPasswords.password');
  }

  get password2() {
    return this.registerForm.get('userPasswords.password2');
  }

  get passwordsMatch() {
    return this.password.value === this.password2.value;
  }

  ngOnDestroy(): void {
    this.screenTrace.stop(); // stop timing the screen when the component is closed
  }


}
