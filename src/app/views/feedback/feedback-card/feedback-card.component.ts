import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FeedbackInterface, FeedbackService} from '../../../services/Posts/feedback.service';
import {AuthService, User} from '../../../services/Auth/auth.service';
import {Angular2MaterializeV1Service} from 'angular2-materialize-v1';
import {faEdit, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faReply} from '@fortawesome/free-solid-svg-icons';

@Component({
  // marks the feedback Message & showRepliesClicked input as required
  selector: 'app-feedback-card[feedbackMessage][showRepliesClicked][user][setReplyingTo]',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.css']
})
export class FeedbackCardComponent implements OnInit, AfterViewInit {
  replyingTo = '';
  // ICONS
  edit = faEdit;
  reply = faReply;
  trash = faTrashAlt;

  @Input() user: User; // The user details to determine if the user has permissions to delete
  @Input() feedbackMessage: FeedbackInterface; // one individual feedback message used to initialize dropdown
  @Output() showRepliesClicked: EventEmitter<string>; // to call the show Replies Modal
  @Output() setReplyingTo: EventEmitter<string>; // pass the post ID for replying

  constructor(public feedbackPostService: FeedbackService,
              public auth: AuthService,
              private angular2MaterializeService: Angular2MaterializeV1Service)
  {
    this.showRepliesClicked = new EventEmitter<string>();
    this.setReplyingTo = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // init the dropdown for each card individually when its loaded
    this.angular2MaterializeService.initDropdown(`#trigger-${this.feedbackMessage.postID}`);
  }

}
