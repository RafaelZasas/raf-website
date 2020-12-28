import {Component, OnInit} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import M from 'materialize-css';
import {CustomValidator} from '../../../../form-validators/authentication.validator';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent implements OnInit {


  elems: any;
  password: any;
  userClicked = false;
  passwordForm: FormGroup;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private fns: AngularFireFunctions
  ) {
  }

  ngOnInit(): void {
    // INITIALIZE THE FORM GROUP
    this.passwordForm = this.fb.group({
      pwdlength: new FormControl('10', [Validators.required]),
      useSymbols: new FormControl('true', [Validators.required]),
      useLetters: new FormControl('true', [Validators.required]),
      useNumbers: new FormControl('true', [Validators.required]),
    });


    this.elems = document.querySelectorAll('select');
    M.FormSelect.init(this.elems); // for the dropdown menu
  }

   getRandomPassword() {
    this.userClicked = true;  // display the password when clicked
    // CHECK IF THE FORM HAS BEEN FILLED OUT CORRECTLY
    if (this.passwordForm.valid) { // check if the form is valid
      const callable = this.fns.httpsCallable('getRandomPassword');
      callable({
        useSymbols: this.getUseSymbols.value,
        useNumbers: this.getUseNumbers.value,
        useLetters: this.getUseLetters.value,
        pwLength: this.pwLength.value
      }).subscribe(res => {
        this.password = res.password;
        console.log(this.password);
      });
      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please fill entire form before submitting.', classes: 'rounded red'});
    }
  }

  getPassword() {
    // FOR WHEN THE USER CLICKS THE SUBMIT -> DISPLAY DATA


    this.userClicked = true;  // display the password when clicked

    // CHECK IF THE FORM HAS BEEN FILLED OUT CORRECTLY
    if (this.passwordForm.valid) { // check if the form is valid

      // SET HEADERS
      const headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*');

      const params = new HttpParams() // set the parameters to be sent
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


  // functions to retrieve form input fields.
  // note* This retrieves the field not the value
  get pwLength() {
    return this.passwordForm.get('pwdlength');
  }

  get getUseSymbols() {
    return this.passwordForm.get('useSymbols');
  }

  get getUseNumbers() {
    return this.passwordForm.get('useNumbers');
  }

  get getUseLetters() {
    return this.passwordForm.get('useLetters');
  }


}
