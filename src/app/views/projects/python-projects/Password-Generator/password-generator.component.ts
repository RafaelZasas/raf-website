import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import M from 'materialize-css';
import {CustomValidator} from '../../../../form-validators/authentication.validator';


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
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // INITIALIZE THE FORM GROUP
    this.passwordForm = this.fb.group({
      pwdlength: new FormControl('10', [Validators.required]),
      useSymbols: new FormControl('true', [Validators.required])
    });


    this.elems = document.querySelectorAll('select');
    M.FormSelect.init(this.elems, this.options); // for the dropdown menu
  }

  getPassword() {
    // FOR WHEN THE USER CLICKS THE SUBMIT -> DISPLAY DATA
    // FOR WHEN THE USER CLICKS THE SUBMIT -> DISPLAY DATA

    this.userClicked = true;

    // CHECK IF THE FORM HAS BEEN FILLED OUT CORRECTLY
    if (this.passwordForm.valid) { // check if the form is valid
      const formData = {
        pwdlength: this.passwordForm.value.pwdlength,
        useSymbols: this.passwordForm.value.useSymbols
      };

      // SET HEADERS
      const headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*');

      const params = new HttpParams()
        .set('pwdLength', this.pwLength.value)
        .set('useSymbols', this.getUseSymbols.value);

      //  FUNCTION URL + PARAMS: User ID, Role to be set, Name for logging

      const ROOT_URL = `https://us-central1-rafael-zasas.cloudfunctions.net/getPassword`;

      this.http.get(ROOT_URL, {headers, params}).subscribe(
        result => {

          console.log(result);
          this.password = result;
        });


      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please fill entire form before submitting.', classes: 'rounded red'});
    }
  }


  get pwLength() {
    return this.passwordForm.get('pwdlength');
  }

  get getUseSymbols() {
    return this.passwordForm.get('useSymbols');
  }


}
