import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import M from 'materialize-css';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AuthService} from '../services/Auth/auth.service';
import {Observable, observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {faTrashAlt, faEdit} from '@fortawesome/free-regular-svg-icons';
import {faReply} from '@fortawesome/free-solid-svg-icons';
import {FeedbackService} from '../services/Posts/feedback.service';

interface FeedbackInterface {
  feedbackMessage: string;
  feedbackType: string;
  displayName?: string;
  uid?: string;
  postID?: string;
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

  // ICONS
  edit = faEdit;
  reply = faReply;
  trash = faTrashAlt;


  constructor(private afs: AngularFirestore,
              public feedbackPostService: FeedbackService,
              public auth: AuthService) {
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

  async onSubmit() {


    if (this.feedbackForm.valid) { // check if the form is valid
      const {uid, displayName} = await this.auth.getUser();

      const formData = {
        feedbackType: this.feedbackForm.value.feedbackType,
        feedbackMessage: this.feedbackForm.value.feedbackMessage,
        uid,
        displayName,
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
