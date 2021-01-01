import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/Auth/auth.service';
import {FeedbackInterface, FeedbackService} from '../../services/Posts/feedback.service';
import {faTrashAlt, faEdit} from '@fortawesome/free-regular-svg-icons';
import {faReply} from '@fortawesome/free-solid-svg-icons';
import M from 'materialize-css';
import * as firebase from 'firebase/app';
// Add the Performance Monitoring library
import 'firebase/performance';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css',
  ]
})
export class FeedbackComponent implements OnInit, OnDestroy {

  replyingTo = '';
  perf = firebase.performance(); // initializes the firebase performance module
  analytics = firebase.analytics();
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened

  feedbackForm: FormGroup;
  replyForm: FormGroup;
  options = {};
  formsElem: any;
  modalElem: any;
  dropdownElem: any;

  // ICONS
  edit = faEdit;
  reply = faReply;
  trash = faTrashAlt;
  hasReplies: boolean;
  showSpinner: boolean;
  showPostsSpinner: boolean;
  currentPost: FeedbackInterface;


  constructor(
    public feedbackPostService: FeedbackService,
    public auth: AuthService) {
  }


  async ngOnInit(): Promise<void> {

    this.showPostsSpinner = true;

    this.screenTrace = this.perf.trace('Feedback Screen');
    this.screenTrace.start(); // start the timer
    const feedbackQueryTrace = this.perf.trace('Feedback Query Trace');

    this.initMaterialize();
    this.initForms();

    feedbackQueryTrace.start();
    await this.feedbackPostService.getPosts();
    feedbackQueryTrace.stop();
    this.showPostsSpinner = false;
  }

  ngOnDestroy(): void {
    this.screenTrace.stop();
  }


  /**
   * Initialize all the dom elements from materialize css that need javascript initializations
   */
  initMaterialize() {


    this.formsElem = document.querySelectorAll('select');
    M.FormSelect.init(this.formsElem, this.options); // for the dropdown menu

    this.modalElem = document.querySelectorAll('.modal');
    M.Modal.init(this.modalElem); // for the popup modals

    this.dropdownElem = document.getElementById('.dropdown-trigger');
    const dropdownOptions = {
      closeOnClick: true,
      hover: true,
    };
    M.Dropdown.init(this.dropdownElem, dropdownOptions);
  }


  /**
   * Initialize all the reactive form groups and their validators
   */
  initForms() {
    //  INIT THE FEEDBACK FORM GROUP
    this.feedbackForm = new FormGroup({
      feedbackMessage: new FormControl('', [Validators.required,
        Validators.minLength(3)]),
      feedbackType: new FormControl('General Feedback', Validators.required)
    });

    // INIT THE REPLY FORM GROUP
    this.replyForm = new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

  /**
   * Validate that forms have been filled out correctly and then call feedback service to create a new post on firestore
   */
  async submitFeedback() {
// todo: add trace metrics for size of collection query and how long it takes
    const trace = this.perf.trace('feedbackSubmitted'); // Track how long it takes users to log in
    trace.start(); // start the screen tracking timer


    if (this.feedbackForm.valid) { // check if the form is valid
      const {uid, username} = await this.auth.getUser();

      const formData = {
        feedbackType: this.feedbackForm.value.feedbackType,
        feedbackMessage: this.feedbackForm.value.feedbackMessage,
        uid,
        username,
      };

      await this.feedbackPostService.createPost(formData);

      // clear the form once submitted
      this.feedbackForm.reset();

      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please enter a message before submitting.', classes: 'rounded red'});
    }

    trace.stop();
  }

  /**
   * validates reply form is filled out correctly and calls the reply function in feedback service to add the reply to firestore
   */
  async replyToPost() {
    if (this.replyForm.valid) {
      const user = await this.auth.getUser();
      const reply = {
        user: user.uid,
        profilePhoto: user.profilePhoto,
        username: user.username,
        message: this.replyForm.value.message
      };
      await this.feedbackPostService.reply(this.replyingTo, reply);
    } else {
      console.log(this.replyForm.valid);
      M.toast({html: 'Please don\'t leave empty replies.', classes: 'rounded red'});
    }
    this.replyForm.reset();

  }

  /**
   * Show the replies for one individual feedback post in a popup modal
   * @param postID: The ID of the post, used to get replies sub collection of that post
   */
  async showReplies(postID: string) {
    this.showSpinner = true;
    this.hasReplies = await this.feedbackPostService.getReplies(postID);
    this.showSpinner = false;
  }


  setPost(message) {
    this.currentPost = message;
    console.log(this.currentPost);
  }
}
