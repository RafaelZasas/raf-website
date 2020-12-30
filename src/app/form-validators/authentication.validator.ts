import {AngularFirestore} from '@angular/fire/firestore';
import {AbstractControl} from '@angular/forms';
import {debounceTime, map, take} from 'rxjs/operators';


export class CustomValidator {  // DEFINE A CLASS TO HANDLE CUSTOM VALIDATION

  static emailLogin(afs: AngularFirestore) {
    // function to ensure user is logging in with an email that exists
    // params:AngularFirestore. returns a dict of string:any or null
    return (control: AbstractControl) => {
      const email = control.value.toLowerCase();

      return afs.collection('users', ref => ref.where('email', '==', email))
        .valueChanges(console.log) //  observable array of users that match the given email
        .pipe(
          debounceTime(500),
          take(1), // choose only the first element in the observable array
          // if array is empty -> there is no associated email. return map of emailExists = False
          // if array is not empty -> an account with that email exists. therefore return null to show valid
          map(arr => !arr.length ? {emailExists: false} : null)
        );
    };
  }


  static emailRegistration(afs: AngularFirestore) { // params:AngularFirestore. returns a dict of string:any or null
    return (control: AbstractControl) => {
      const email = control.value.toLowerCase();

      return afs.collection('users', ref => ref.where('email', '==', email))
        .valueChanges() //  observable array of users that match the given email
        .pipe(
          debounceTime(500),
          take(1), // choose only the first element in the observable array

          // if array isn't empty return map -> false meaning email already exists in db
          // otherwise return null meaning email is not in db input is valid
          map(arr => arr.length ? {emailNew: false} : null)
        );
    };
  }


  static usernameAvailability(afs: AngularFirestore) { // params:AngularFirestore. returns a dict of string:any or null
    return (control: AbstractControl) => {
      const username = control.value.toLowerCase();

      return afs.collection('users', ref => ref.where('username', '==', username))
        .valueChanges()//  observable array of users that match the given email
        .pipe(
          debounceTime(500),
          take(1), // choose only the first element in the observable array
          // if array has items in it there are documents with that username. therefore not valid
          map(arr => arr.length ? {usernameAvailable: false} : null),
        );
    };

  }


}
