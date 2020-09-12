import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import M from 'materialize-css';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent implements OnInit {


  options = {};
  elems: any;
  password: any;
  userClicked = false;
  passwordForm: FormGroup;


  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    // INITIALIZE THE FORM GROUP
    this.passwordForm = new FormGroup({
      pwdlength: new FormControl('10', [Validators.required]),
      useSymbols: new FormControl('true', [Validators.required])
    });


    this.elems = document.querySelectorAll('select');
    M.FormSelect.init(this.elems, this.options); // for the dropdown menu
  }

  getPassword() {
    // FOR WHEN THE USER CLICKS THE SUBMIT -> DISPLAY DATA
    // FOR WHEN THE USER CLICKS THE SUBMIT -> DISPLAY DATA
    let password;
    this.userClicked = true;

    // CHECK IF THE FORM HAS BEEN FILLED OUT CORRECTLY
    if (this.passwordForm.valid) { // check if the form is valid
      const formData = {
        pwdlength: this.passwordForm.value.pwdlength,
        useSymbols: this.passwordForm.value.useSymbols
      };

      // SET HEADERS
      const headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('content-type', 'application/json')
        .set('name', 'Rafael Zasas')
        .set('Accept', 'application/json');

      //  FUNCTION URL + PARAMS: User ID, Role to be set, Name for logging

      const ROOT_URL = `http://34.72.115.208/password?pwd_length=${formData.pwdlength}&use_symbols=${formData.useSymbols}`;
      this.http.get(ROOT_URL, {headers}).subscribe(
        result => {
          console.log(result);
          this.password = result;
        });

      return this.password;


      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please fil entire form before submitting.', classes: 'rounded red'});
    }
  }


}
