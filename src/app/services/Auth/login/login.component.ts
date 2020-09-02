import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import M from 'Materialize-css';
import {
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  google = faGoogle;
  loginForm: any;

  constructor(public auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {


    // Init the data to be collected and validate

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.email]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }


  onSubmit() {

    if (this.loginForm.valid) { // check if the form is valid
      const formData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      // provide credentials for email login service
      this.auth.emailSignIn(formData.email, formData.password)
        .catch( err => {
          M.toast({html: `Error: ${err.errorMessage}`, classes: 'rounded materialize-red'});
        });


      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please enter valid email/password combination', classes: 'rounded red'});
    }
  }
}
