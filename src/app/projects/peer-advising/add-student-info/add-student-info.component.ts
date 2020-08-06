import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import M from 'materialize-css';

interface AdvisingInterface {
  email: string;
  firstName: string;
  lastName: string;
  studentID: number;
  gender: string;
}

@Component({
  selector: 'app-add-student-info',
  templateUrl: './add-student-info.component.html',
  styleUrls: ['./add-student-info.component.css']
})
export class AddStudentInfoComponent implements OnInit {

  AdvisingCollection: AngularFirestoreCollection<AdvisingInterface>; // passing the interface : Feedback
  userInfoObservable: Observable<AdvisingInterface[]>;
  advisingForm: FormGroup;

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {

    this.advisingForm = new FormGroup(
      {
        email: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        studentID: new FormControl(''),
        gender: new FormControl(''),
      }
    ); // initialize the form

    this.AdvisingCollection = this.afs.collection('PeerAdvising', ref => {
      return ref.limit(3);
    }); // reference to the firestore collection
    this.userInfoObservable = this.AdvisingCollection.valueChanges(); // retrieve all the changes made in the observable
  }

  onSubmit() {

    if (this.advisingForm.valid) { // check if the form is valid
      const formData = {
        email: this.advisingForm.value.email,
        firstName: this.advisingForm.value.firstName,
        lastName: this.advisingForm.value.lastName,
        studentID: this.advisingForm.value.studentID,
        gender: this.advisingForm.value.gender,
      };
      // @ts-ignore
      this.AdvisingCollection.add(formData).then(r => console.log('stored feedback successfully'),
        M.toast({html: 'Thank you !', classes: 'rounded blue'}));

      // clear the form once submitted
      this.advisingForm.reset();

      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please enter a message before submitting.', classes: 'rounded red'});
      console.log(this.advisingForm.value);
    }
  }

}
