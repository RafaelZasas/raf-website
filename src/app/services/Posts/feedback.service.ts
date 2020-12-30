import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AuthService} from '../Auth/auth.service';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';


export interface FeedbackInterface {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  permissions?: string;
}


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {


  feedbackCollection: AngularFirestoreCollection<FeedbackInterface>; // passing the interface : Feedback
  feedbackMessages: Observable<FeedbackInterface[]>;

  postRef: AngularFirestoreDocument<any>;
  post$: Observable<any>; // observable of data within the post


  constructor(    // inject imports for fire store auth service in constructor
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private auth: AuthService) {

    this.postRef = this.afs.doc('Feedback/{document}');
    this.post$ = this.postRef.valueChanges();

    // INIT CONNECTION TO FIRESTORE COLLECTION
    this.feedbackCollection = this.afs.collection<FeedbackInterface>
    ('Feedback', ref => { // collection to store firestore data
      return ref;
    }); // reference

    // SUBSCRIBE TO THE CHANGES
    this.feedbackMessages = this.feedbackCollection.valueChanges(); // observable of notes data

  }

  editPost(message) {

    this.postRef.update({
      feedbackMessage: message
    });
  }

  deletePost(postID) {
    this.feedbackCollection.doc(postID).delete()
      .then(r => console.log('Post was successfully deleted')).catch(console.log);
  }


}
