import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import M from 'Materialize-css';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';
import 'firebase/analytics';
import * as firebase from 'firebase';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  permissions?: {};
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  analytics = firebase.analytics(); // this declaration works better than constructor init from import
  userCredential; // to store the promise returned when signing up/ in with email & password

  constructor(
    // inject imports for fire store auth service in constructor
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(  // define the observable state
      switchMap(user => {
        // Logged in
        if (user) { // if user is defined
          // point to document with matching ID
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null); // allows us to tell when user is not logged in
        }
      })
    );
  }

  // type: User from the model
  user$: Observable<User>; // defined as observable as it can change when user signs in/out


  // determines if user has matching role
  private static checkAuthorization(user: User, allowedRoles: string[]): boolean {

    for (const role of allowedRoles) {
      if (user.permissions[role]) {
        return true;
      }
    } // if the role is not within the logged in users permissions then
    return false;
  }


  async getUser() {
    return this.user$.pipe(first()).toPromise();
    // gets the first obj in user$ observable
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'edit', 'user'];
    return AuthService.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'edit'];
    return AuthService.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return AuthService.checkAuthorization(user, allowed);
  }


  /*

SECTION FOR AUTHENTICATING USERS WITH VARIOUS PROVIDERS

 */

  // FUNCTION FOR REGISTERING USERS WITH EMAIL & PASSWORD

  async emailRegistration(email, password, username) {

    const result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(cred => {
      this.userCredential = cred;
      console.log(`New user: ${this.userCredential.email} has registered`);
      this.analytics.logEvent('authService', {serviceName: 'Email & Password registration'});
    }).catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(`Error Code: ${errorCode}\nError Message: ${errorMessage}`);
      M.toast({html: `Error: ${errorMessage}`, classes: 'rounded materialize-red'});
    });

    await this.insertNewUser(this.userCredential.user, username).then(r =>
      this.router.navigate(['/user-profile']))
      .catch(r => {
        M.toast({html: `Error: ${r.errorMessage}`, classes: 'rounded materialize-red'});
        console.log(`Login Error\n${r}`);
      });
  }


  // FUNCTION FOR SIGNING IN USERS WITH EMAIL & PASSWORD

  async emailSignIn(email, password) {
    // reference google auth provider

    // pass provider to sign in with popup functionality
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(`Error Code: ${errorCode} \n Error Message: ${errorMessage}`);
        M.toast({html: `Error: ${errorMessage}`, classes: 'rounded materialize-red'});
      }).then(cred => {
      this.userCredential = cred;
      this.analytics.logEvent('authService', {serviceName: 'Email & Password Sign In'});
      this.router.navigate(['/user-profile']);
      M.toast({html: `Signed in as ${this.userCredential.displayName}`, classes: 'rounded blue'});
    });

  }


  async googleSignIn(registration: boolean = false) { // optional param to specify that user is registering
    // async function to sign in or register users with Google oAuth provider

    // reference google auth provider
    const provider = new auth.GoogleAuthProvider();

    // pass provider to sign in with popup functionality
    const credential = await this.afAuth.signInWithPopup(provider);  // auth.signInWithPopup(provider);
    this.analytics.logEvent('authService', {serviceName: 'Google Login'});

    if (registration) {
      await this.updateUserData(credential.user)
        .then(r =>
          this.router.navigate(['/user-profile'])).catch(r => console.log('Login Error')
        )
        .then(
          M.toast({html: `Signed in as ${credential.user.displayName}`, classes: 'rounded blue'}))
        .catch(err => {
          M.toast({html: `Error: ${err.errorMessage}`, classes: 'rounded materialize-red'});
        });
    } else {
      await this.insertNewUser(credential.user, credential.user.displayName)
        .then(r =>
          this.router.navigate(['/user-profile'])).catch(r => console.log('Login Error')
        )
        .then(
          M.toast({html: `Signed in as ${credential.user.displayName}`, classes: 'rounded blue'}))
        .catch(err => {
          M.toast({html: `Error: ${err.errorMessage}`, classes: 'rounded materialize-red'});
        });
    }

  }

  async signOut() {
    await this.afAuth.signOut().then(r =>
      this.router.navigate(['/login'])
        .then(res =>
          M.toast({html: `Logged out successfully`, classes: 'rounded materialize-red'})
        ))
      .catch(e => console.log(`Error Signing Out\n${e}`));  // auth.signOut();
  }


  private insertNewUser(user, username) {
    console.log(user);
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { // data payload we want to save
      uid: user.uid,
      email: user.email,
      displayName: username,
      username,
      photoURL: 'https://firebasestorage.googleapis.com/v0/b/rafael-zasas.appspot.com' +
        '/o/peer-advising%2Fdefault.jpg?alt=media&token=8afe60c6-0fd5-42da-9a1d-3897a77a1fb9',
      permissions: {
        user: true,
        edit: false,
        admin: false
      }
    };

    return userRef.set(data, {merge: true}); // merge stops destructive operation

  }


  /*
      SECTION FOR UPDATING USER DATA IN FIRESTORE
*/


  private updateUserData(user) {
    // updates user data upon login. Keeps track of user profile photo/ display name changes
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = { // data payload we want to save
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, {merge: true}); // merge stops destructive operation

  }


}
