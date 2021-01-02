import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import { trace } from '@angular/fire/performance';
import {AngularFirePerformance} from '@angular/fire/performance';
import {Angular2MaterializeV1Service} from 'angular2-materialize-v1';
import {FeedbackInterface} from './Posts/feedback.service';
import {User} from './Auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  usersCollection: AngularFirestoreCollection<User>; // passing the interface : Feedback
  users: Observable<User[]>;

  constructor(
    private angular2MaterializeService: Angular2MaterializeV1Service,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private performance: AngularFirePerformance) {
  }

  async getAllUsers() {
    try {
      const getUsersTrace = await this.performance.trace('Get Users');
      getUsersTrace.start();

      // INIT CONNECTION TO FIRESTORE COLLECTION
      this.usersCollection = this.afs.collection<FeedbackInterface>
      ('users', ref => { // collection to store firestore data
        return ref;
      }); // reference
      // SUBSCRIBE TO THE CHANGES
      this.users = await this.usersCollection.valueChanges({idField: 'id'}).pipe(trace('Get All Users'));
      getUsersTrace.stop();
    } catch (e) {
      console.log(`${e.code}\n${e.message}`);
      this.angular2MaterializeService.toast({html: `Error getting feedback\n${e.code}`, classes: 'rounded red'});
    }
  }


}
