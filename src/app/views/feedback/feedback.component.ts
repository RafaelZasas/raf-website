import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AuthService} from '../../services/Auth/auth.service';
import {FeedbackService} from '../../services/Posts/feedback.service';
import {Observable} from 'rxjs';
import {faTrashAlt, faEdit} from '@fortawesome/free-regular-svg-icons';
import {faReply} from '@fortawesome/free-solid-svg-icons';
import M from 'materialize-css';
import * as firebase from 'firebase/app';
// Add the Performance Monitoring library
import 'firebase/performance';

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
export class FeedbackComponent implements OnInit, OnDestroy {

  perf = firebase.performance(); // initializes the firebase performance module
  analytics = firebase.analytics();
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened

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

    this.screenTrace = this.perf.trace('aboutMeScreen'); // trace name = loginScreen for tracking in FB
    this.screenTrace.start(); // start the timer
    const trace = this.perf.trace('feedbackQueryTrace');

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
    this.feedbackMessages = this.feedbackCollection
      .valueChanges({idField: 'id'});
  }

  ngOnDestroy(): void {
    this.screenTrace.stop();
  }

  async onSubmit() {
// todo: add trace metrics for size of collection query and how long it takes
    const trace = this.perf.trace('feedbackSubmitted'); // Track how long it takes users to log in
    trace.start(); // start the screen tracking timer


    if (this.feedbackForm.valid) { // check if the form is valid
      const {uid, displayName} = await this.auth.getUser();

      const formData = {
        feedbackType: this.feedbackForm.value.feedbackType,
        feedbackMessage: this.feedbackForm.value.feedbackMessage,
        uid,
        displayName,
      };

      this.feedbackCollection.add(formData).then(r => console.log('stored feedback successfully'),
        M.toast({html: 'Thank you !', classes: 'rounded blue'}));
      this.analytics.logEvent('feedbackService', {serviceName: 'Feedback Submitted'});

      // clear the form once submitted
      this.feedbackForm.reset();

      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please enter a message before submitting.', classes: 'rounded red'});
    }

    trace.stop();
  }


}
