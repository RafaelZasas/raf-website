import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {trace} from '@angular/fire/performance';
import {Angular2MaterializeV1Service} from 'angular2-materialize-v1';
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
    private afs: AngularFirestore) {

    // INIT CONNECTION TO FIRESTORE COLLECTION
    this.usersCollection = this.afs.collection<User>
    ('users', ref => { // collection to store firestore data
      return ref;
    }); // reference
  }

  getAllUsers() {
    try {
      // SUBSCRIBE TO THE CHANGES
      this.users = this.usersCollection.valueChanges({idField: 'id'}).pipe(trace('Get All Users'));
    } catch (e) {
      console.log(`${e.code}\n${e.message}`);
      this.angular2MaterializeService.toast({
        html: `🐛 Error getting feedback\n${e.code}`,
        classes: 'rounded materialize-red'
      });
    }
  }

  async changePermissions(user: User, permission: string) {
    try {

      const data = {
        permissions: {
          user: permission === 'user' ? !user.permissions.user : user.permissions.user,
          edit: permission === 'edit' ? !user.permissions.edit : user.permissions.edit,
          admin: permission === 'admin' ? !user.permissions.admin : user.permissions.admin,
        }
      };
      await this.usersCollection.doc(user.uid).update(
        data
      );
      const html = `<p class="black-text">Successfully changed ${permission} permission 💡</p>`;
      this.angular2MaterializeService.toast({
        html,
        classes: 'rounded cyan lighten-1'
      });
      console.log(`Successfully changed ${permission} permission 💡`);
    } catch (e) {
      console.log(`${e.code}\n${e.message}`);
      this.angular2MaterializeService.toast({
        html: `🐛 Error updating permissions\n${e.code}`,
        classes: 'rounded materialize-red'
      });
    }
  }


}
