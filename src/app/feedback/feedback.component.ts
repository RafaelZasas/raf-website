import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import M from 'materialize-css';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable, observable} from 'rxjs';
import {map} from 'rxjs/operators';


interface FeedbackInterface {
  feedbackMessage: string;
  feedbackType: string;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackCollection: AngularFirestoreCollection<FeedbackInterface>; // passing the interface : Feedback
  feedbackMessages: Observable<FeedbackInterface[]>;
  feedbackForm: FormGroup;
  options = {};
  elems: any;


  constructor(private afs: AngularFirestore) {
  }


  ngOnInit(): void {

    // DROPDOWN FUNCTIONALITY FOR MATERIALIZE
    this.elems = document.querySelectorAll('select');
    M.FormSelect.init(this.elems, this.options); // for the dropdown menu

    // INIT THE FORM GROUP

    this.feedbackForm = new FormGroup({
      feedbackMessage: new FormControl('', [Validators.required,
        Validators.minLength(3)]),
      feedbackType: new FormControl('General Feedback', Validators.required)
    });

    // INIT CONNECTION TO FIRESTORE COLLECTION
    this.feedbackCollection = this.afs.collection<FeedbackInterface>('Feedback', ref => { // collection to store firestore data
      return ref;
    }); // reference

    // SUBSCRIBE TO THE CHANGES
    this.feedbackMessages = this.feedbackCollection.valueChanges(); // observable of notes data


  }

  onSubmit() {

    if (this.feedbackForm.valid) { // check if the form is valid
      const formData = {
        feedbackType: this.feedbackForm.value.feedbackType,
        feedbackMessage: this.feedbackForm.value.feedbackMessage
      };
      // @ts-ignore
      this.feedbackCollection.add(formData).then(r => console.log('stored feedback successfully'),
        M.toast({html: 'Thank you !', classes: 'rounded blue'}));

      // clear the form once submitted
      this.feedbackForm.reset();

      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please enter a message before submitting.', classes: 'rounded red'});
    }
  }

}
