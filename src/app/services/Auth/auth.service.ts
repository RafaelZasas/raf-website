import {Injectable} from '@angular/core';
import {Router} from '@angular/router';


import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import {Observable, of} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';


export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  permissions?: string[];
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }


  async googleSignin() { // async function due to promised based api
    // reference google auth provider
    const provider = new auth.GoogleAuthProvider();

    // pass provider to sign in with popup functionality
    const credential = await this.afAuth.signInWithPopup(provider);  // auth.signInWithPopup(provider);

    await this.updateUserData(credential.user).then(r =>
      this.router.navigate(['/user-profile'])).catch(r => console.log('Login Error'));
  }

  async signOut() {
    await this.afAuth.signOut().then(r =>
      this.router.navigate(['/login']).then(res => console.log('logged out.')))
      .catch(e => console.log(`Error Signing Out\n${e}`));  // auth.signOut();
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = { // data payload we want to save
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      permissions: {
        user: true
      }
    };

    return userRef.set(data, {merge: true}); // merge stops destructive operation

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

}
