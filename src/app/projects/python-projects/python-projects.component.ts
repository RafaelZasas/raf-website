import {Component, OnInit} from '@angular/core';
import M from 'materialize-css';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-python-projects',
  templateUrl: './python-projects.component.html',
  styleUrls: ['./python-projects.component.css']
})
export class PythonProjectsComponent implements OnInit {

  options = {};
  elems: any;
  password: any;
  private params: HttpParams;
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
    this.userClicked = true;

    // CHECK IF THE FORM HAS BEEN FILLED OUT CORRECTLY
    if (this.passwordForm.valid) { // check if the form is valid
      const formData = {
        pwdlength: this.passwordForm.value.pwdlength,
        useSymbols: this.passwordForm.value.useSymbols
      };

      // SEND THE HTTP GET REQUEST TO API

      const headers = new HttpHeaders()
        .set('Accept', '*');

      // BUILD URL STRING WITH PARAMS
      const ROOT_URL = `http://34.72.115.208/password?pwd_length=${formData.pwdlength}&use_symbols=${formData.useSymbols}`;

      this.http.get(ROOT_URL, {headers}).subscribe(
        (data: any[]) => {
          this.password = data;
          this.password = this.password.password;
          console.log(this.password);
          if (!this.password) {
            M.toast({html: 'There was a server-side issue.', classes: 'rounded red'});
          }
        });

      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please fil entire form before submitting.', classes: 'rounded red'});
    }
  }


}
