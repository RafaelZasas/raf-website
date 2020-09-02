import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import M from 'Materialize-css';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(public auth: AuthService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // Init the data to be collected and validate


    // FORM GROUP FOR THE USER DATA
    const userData = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
        Validators.email]),
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

    if (this.registerForm.valid) { // check if the form is valid
      // provide credentials for email login service
      this.auth.emailRegistration(
        this.email.value,
        this.password.value,
        this.username.value
      ).then(r =>
        M.toast({html: `Hey ${this.username.value}, Thanks for signing up!`, classes: 'rounded blue'}));
      // if the user hasn't filled out correctly
    } else {
      console.log('Please fill out form correctly');
    }
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


}
