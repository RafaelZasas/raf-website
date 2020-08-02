import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface StudentInterface {
  email: string;
  firstName: string;
  lastName: string;
  studentID: number;
  gender: string;
}

@Component({
  selector: 'app-peer-advising',
  templateUrl: './peer-advising.component.html',
  styleUrls: ['./peer-advising.component.css']
})
export class PeerAdvisingComponent implements OnInit {

  StudentCollection: AngularFirestoreCollection<StudentInterface>; // passing the interface : Feedback
  StudentObservable: Observable<StudentInterface[]>;

  constructor(private db: AngularFirestore) {
  }

  ngOnInit(): void {
    // REFERENCE THE FIRESTORE COLLECTION
    this.StudentCollection = this.db.collection('PeerAdvising');
    this.StudentObservable = this.StudentCollection.valueChanges();
    console.log(this.StudentCollection);
  }


}
