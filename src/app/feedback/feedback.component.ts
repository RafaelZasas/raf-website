import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import M from 'materialize-css';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable, observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {JsonpInterceptor} from '@angular/common/http';
import {ajaxGetJSON} from 'rxjs/internal-compatibility';

interface Feedback {
  message: string;
  type: string;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackCollection: AngularFirestoreCollection<Feedback>; // passing the interface : Feedback
  feedbackMessages: Observable<Feedback[]>;
  feedbackForm: FormGroup;
  options = {};
  elems: any;


  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      feedbackMessage: new FormControl('', [Validators.required,
        Validators.minLength(3)]),
      feedbackType: new FormControl('General Feedback', Validators.required)
    }); // init the form

    this.elems = document.querySelectorAll('select');
    M.FormSelect.init(this.elems, this.options); // for the dropdown menu

    this.feedbackCollection = this.afs.collection('Feedback', ref => { // collection to store firestore data
      return ref.limit(3);
    }); // reference
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
