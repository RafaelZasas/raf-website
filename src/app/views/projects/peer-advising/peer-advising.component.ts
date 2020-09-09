import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
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
  img: string;
  registrationReady: boolean;
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


    // REFERENCE THE FIRESTORE COLLECTION
    this.StudentCollection = this.db.collection<StudentInterface>('PeerAdvising'); // ref the collection of type interface
    this.StudentObservable = this.StudentCollection.valueChanges();

  }


}
