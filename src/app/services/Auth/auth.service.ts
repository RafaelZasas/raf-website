import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import M from 'Materialize-css';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';

export interface User {
  // describes the data that a user is expected expected to contain
  uid: string;
  email: string;
  photoURL?: string;
  profilePhoto?: string;
  displayName?: string;
  username?: string;
  permissions?: {};
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  analytics = firebase.analytics(); // this declaration works better than constructor init from import
  userCredential; // to store the promise returned when signing up/ in with email & password
  // type: User from the model
  user$: Observable<User>; // defined as observable as it can change when user signs in/out

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


  /**
   * Role-based Authorization Section
   */

  /**
   * Boolean function to determine whether or not the user has the requested permissions
   * @param {User} user
   * @param {string[]} allowedRoles
   * @return boolean: whether or not user has the requested permissions
   */
  private static checkAuthorization(user: User, allowedRoles: string[]): boolean {

    for (const role of allowedRoles) {
      if (user.permissions[role]) {
        return true;
      }
    } // if the role is not within the logged in users permissions then
    return false;
  }


  /**
   * Function to get the currently signed in user and associated data.
   */
  async getUser() {
    return this.user$.pipe(first()).toPromise();
    // gets the first obj in user$ observable
  }

  /**
   * The following functions are used by the checkAuthorization function
   */

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


  /**
   *  Register users with email and password
   *  @param  {String} email: Email captured from form
   *  @param  {String} password: Password captured from form
   *  @param  {String} username: Username captured from form
   */
  async emailRegistration(email, password, username) {

    try {
      this.userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      M.toast({html: `Error: ${err.message}`, classes: 'rounded materialize-red'});
      console.log(`Error Code: ${err.code}\nError Message: ${err.message}`);
    }


    try {
      await this.insertNewUser(this.userCredential.user, username, true);
      await this.router.navigate(['/user-profile']);
    } catch (err) {
      console.log(`Login Error: ${err.code}\n${err.message}`);
      M.toast({html: `Error inserting user into database\n${err.code}\n${err.message}`, classes: 'rounded materialize-red'});
    }
  }


  /**
   *  Sign users in with email and password
   *  @param  {String} email: Email captured from form
   *  @param  {String} password: Password captured from form
   */
  async emailSignIn(email, password) {
    try {
      this.userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.router.navigate(['/user-profile']);
      if (!this.userCredential.emailVerified) {  // let user know that they haven't been verified
        M.toast({
          html: `Your email has not yet been verified. Please check your inbox.`,
          classes: 'rounded orange darken-2'
        });
      }
      // register the login with analytics
      this.analytics.logEvent('login', {serviceName: 'Email & Password Sign In'});

    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        console.log(`Error Code: ${err.code} \n Error Message: ${err.message}`);
        M.toast({html: 'The password you entered is incorrect', classes: 'rounded materialize-red'});
      } else {
        console.log(`Error Code: ${err.code} \n Error Message: ${err.message}`);
        M.toast({html: `Error: ${err.message}`, classes: 'rounded materialize-red'});
      }
    }

  }


  /**
   * Authenticate users with Google O-Auth provider
   * @param {boolean=} [registration = false] - whether this is the first sign in or not
   */
  async googleSignIn(registration: boolean = false) {

    // reference google auth provider
    const provider = new auth.GoogleAuthProvider();
    // pass provider to sign in with popup functionality
    this.userCredential = await this.afAuth.signInWithPopup(provider);

    if (registration) { // if the request is coming from the registration page

      try {
        await this.insertNewUser(this.userCredential.user, this.userCredential.user.displayName);
        await this.verifyEmail(); // send a verification email to the user when registering
        await this.router.navigate(['/user-profile']);
      } catch (err) {
        console.log(`Error: ${err.errorMessage}`);
        M.toast({html: `Error: ${err.errorMessage}`, classes: 'rounded materialize-red'});
      }

    } else {  //  user is logging in again

      try {
        await this.router.navigate(['/user-profile']);
        M.toast({html: `Signed in as ${this.userCredential.user.displayName}`, classes: 'rounded blue'});

        // let user know that they haven't been verified
        if (!this.userCredential.emailVerified) {
          console.log(`user's email has not been verified`);
          M.toast({
            html: `Your email has not yet been verified. Please check your inbox.`,
            classes: 'rounded orange darken-2'
          });
        }

      } catch (err) {
        console.log(`Error: ${err.errorMessage}`);
        M.toast({html: `Error: ${err.errorMessage}`, classes: 'rounded materialize-red'});
      }

    }

    // track the login event with analytics
    this.analytics.logEvent('login', {serviceName: 'Google Login'});

  }


  /**
   * Insert data of newly registered user to firestore
   * @param {User} user - The user object obtained from auth
   * @param {string} username - The username obtained from the register form
   * @param {boolean=} [emailRegister = false] - whether this is the first sign in or not
   * @private
   */
  private async insertNewUser(user: User, username: string, emailRegister: boolean = false) {

    console.log(user);
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // set the profile picture to default if not signing in with provider
    const profilePhoto = emailRegister ? 'https://firebasestorage.googleapis.com/v0/b/rafael-zasas.appspot.com/' +
      'o/peer-advising%2Fdefault.jpg?alt=media&token=8afe60c6-0fd5-42da-9a1d-3897a77a1fb9' : user.photoURL;


    const data = { // data payload we want to save
      uid: user.uid,
      email: user.email,
      username,
      profilePhoto,
      permissions: {
        user: true,
        edit: false,
        admin: false
      }
    };

    return userRef.set(data, {merge: true}); // merge stops destructive operation
  }

  /** Send an email which verifies the users email address */
  async verifyEmail() {
    try {
      const user = auth().currentUser;
      await user.sendEmailVerification();
      M.toast({html: `Check your inbox for ${user.email} to verify your email`, classes: 'rounded blue'});
    } catch (error) {
      console.log(`Error Code:${error.code}\nError Message:${error.message}`);
    }
  }


  /**
   * Sign out users from auth service and re route to login page
   */
  async signOut() {
    try {
      await this.afAuth.signOut();  // auth.signOut();
      M.toast({html: `Logged out successfully`, classes: 'rounded materialize-red'});
      await this.router.navigate(['/login']);
    } catch (err) {
      console.log(`Error Signing Out\n${err}`);
    }

  }


}
