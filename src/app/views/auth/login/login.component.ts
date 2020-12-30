import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/Auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import M from 'materialize-css';

import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {CustomValidator} from '../../../form-validators/authentication.validator';
import {AngularFirestore} from '@angular/fire/firestore';
// Add the Performance Monitoring library
import * as firebase from 'firebase/app';
import {AngularFireAnalytics} from '@angular/fire/analytics';
import 'firebase/performance';
import 'firebase/analytics';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  perf = firebase.performance(); // initializes the firebase performance module
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened
  google = faGoogle;
  loginForm: FormGroup;
  analytics: AngularFireAnalytics;

  constructor(public auth: AuthService, private afs: AngularFirestore, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.screenTrace = this.perf.trace('loginScreen'); // trace name = loginScreen for tracking in FB
    this.screenTrace.start(); // start the timer

    // Init the data to be collected and validate

    this.loginForm = this.fb.group({
      email: new FormControl('',
        [Validators.required, Validators.email],
        [CustomValidator.emailLogin(this.afs)]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }


  onSubmit() {
    const trace = this.perf.trace('userLogin'); // Track how long it takes users to log in
    trace.start(); // start the screen tracking timer

    if (this.loginForm.valid) { // check if the form is valid
      const formData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      // provide credentials for email login service
      this.auth.emailSignIn(formData.email, formData.password)
        .catch(err => {
          trace.putAttribute('errorCode', err.code); // log the error to performance monitoring
          M.toast({html: `Error: ${err.errorMessage}`, classes: 'rounded materialize-red'});
        });


      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please enter valid email/password combination', classes: 'rounded red'});
    }

    trace.stop();
  }

  ngOnDestroy(): void {
    this.screenTrace.stop(); // stop timing the screen when the component is closed
  }

  get email() {
    return this.loginForm.get('email');
  }
}
