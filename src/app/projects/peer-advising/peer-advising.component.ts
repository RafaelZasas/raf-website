import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';


interface StudentInterface {
  email: string;
  firstname: string;
  lastname: string;
  studentID: number;
  gender: string;
  major: string;
  course1: string;
  course2: string;
  plus1: string;
  notes: string;
  img:string;
}


@Component({
  selector: 'app-peer-advising',
  templateUrl: './peer-advising.component.html',
  styleUrls: ['./peer-advising.component.css']
})
export class PeerAdvisingComponent implements OnInit {

  StudentCollection: AngularFirestoreCollection<StudentInterface>; // passing the interface : Feedback
  StudentObservable: Observable<StudentInterface[]>;
  d: any;

  constructor(private db: AngularFirestore) {
  }

  ngOnInit(): void {
    // Sets user data to firestore on login


    // REFERENCE THE FIRESTORE COLLECTION
    this.StudentCollection = this.db.collection<StudentInterface>('PeerAdvising'); // ref the collection of type interface
    this.StudentObservable = this.StudentCollection.valueChanges();

    this.StudentObservable.forEach(value => console.log(value)).then(r => console.log('done') );


    // const data = { // data payload we want to save
    //   uid: this.StudentObservable.uid,
    //   email: this.StudentObservable.email,
    //   displayName: this.StudentObservable.displayName,
    //   photoURL: this.StudentObservable.photoURL
    // };


  }


}
