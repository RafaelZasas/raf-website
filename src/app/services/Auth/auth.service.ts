import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './user.model'; // optional

import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>; // defined as observable as it can change when user signs in/out
  // type: User from the model

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

  async googleSignin() { // async function due to promised based api
    // reference google auth provider
    const provider = new auth.GoogleAuthProvider();

    // pass provider to sign in with popup functionality
    const credential = await this.afAuth.signInWithPopup(provider);  // auth.signInWithPopup(provider);

    await this.updateUserData(credential.user).then(r =>
      this.router.navigate(['/user-profile'])).catch(r => console.log('Login Error'));
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { // data payload we want to save
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, {merge: true}); // merge stops destructive operation

  }

  async signOut() {
    await this.afAuth.signOut();  // auth.signOut();
    await this.router.navigate(['/login']);
  }

}
