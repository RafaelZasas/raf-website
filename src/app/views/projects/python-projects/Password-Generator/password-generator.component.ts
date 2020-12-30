import {Component, OnInit} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import M from 'materialize-css';
import {faCopy} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent implements OnInit {
  callable = this.fns.httpsCallable('getRandomPassword');
  elems: any;
  password: any;
  userClicked = false;
  passwordForm: FormGroup;
  copyIcon = faCopy;

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

    async getRandomPassword() {
     this.userClicked = true;  // display the password when clicked
     // CHECK IF THE FORM HAS BEEN FILLED OUT CORRECTLY
     if (this.passwordForm.valid) { // check if the form is valid
       try {
         this.password = await this.callable({
           useSymbols: this.getUseSymbols.value,
           useNumbers: this.getUseNumbers.value,
           useLetters: this.getUseLetters.value,
           pwLength: this.pwLength.value
         }).toPromise();
         console.log(this.password);
       } catch (e) {
         M.toast({html: `${e.code}\n${e.message}`, classes: 'rounded red'});
       }

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


  copyPassword() {
    const pw = document.createElement('textarea');
    pw.value = this.password.password;
    document.body.appendChild(pw);
    pw.focus();
    pw.select();
    document.execCommand('copy');
    document.body.removeChild(pw);
    M.toast({html: 'Copied to clipboard', classes: 'rounded blue'});
  }
}
