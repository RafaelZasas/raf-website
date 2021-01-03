import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireAnalytics} from '@angular/fire/analytics';
import M from 'materialize-css';
import {take} from 'rxjs/operators';
import {Angular2MaterializeV1Service} from 'angular2-materialize-v1';


export interface FeedbackInterface {
  uid: string;
  username?: string;
  email: string;
  profilePhoto?: string;
  permissions: {
    user: boolean,
    edit: boolean,
    admin: boolean
  };
  feedbackMessage: string;
  feedbackType: string;
  postID: string;
  replies: FeedbackRepliesInterface;
}

export interface FeedbackRepliesInterface {
  message: string;
  profilePhoto: string;
  uid: string;
  username: string;
  id: string;
}


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  FeedbackCollection: AngularFirestoreCollection<FeedbackInterface>; // passing the interface : Feedback
  feedbackMessages: Observable<FeedbackInterface[]>;

  feedbackRepliesCollection: AngularFirestoreCollection<FeedbackRepliesInterface>;
  feedbackReplies: Observable<FeedbackRepliesInterface[]>;

  postRef: AngularFirestoreDocument<any>;
  post$: Observable<any>; // observable of data within the post
  hasReplies: boolean;


  constructor(    // inject imports for fire store auth service in constructor
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private analytics: AngularFireAnalytics,
    private angular2MaterializeService: Angular2MaterializeV1Service) {
  }


  /**
   * Retrieve all the feedback posts from firestore in the Feedback/ collection and subscribe to the changes
   */
  async getPosts() {
    try {
      // INIT CONNECTION TO FIRESTORE COLLECTION
      this.FeedbackCollection = this.afs.collection<FeedbackInterface>
      ('Feedback', ref => { // collection to store firestore data
        return ref;
      }); // reference
      // SUBSCRIBE TO THE CHANGES
      this.feedbackMessages = await this.FeedbackCollection.valueChanges({idField: 'id'});
    } catch (e) {
      console.log(`${e.code}\n${e.message}`);
      this.angular2MaterializeService.toast({html: `Error getting feedback 🐛\n${e.code}`, classes: 'rounded red'});
    }

  }

  /**
   * Create a new firestore data entry of Feedback/{document}
   * @param formData: Map of the feedback type, message and user who created it.
   */
  async createPost(formData) {
    try {
      await this.FeedbackCollection.add(formData);
      console.log('stored feedback successfully');
      this.angular2MaterializeService.toast({html: 'Thank you 🍻!', classes: 'rounded blue'});
      await this.analytics.logEvent('feedbackService', {serviceName: 'Feedback Submitted'});
    } catch (e) {
      console.log(`${e.code}\n${e.message}`);
      this.angular2MaterializeService.toast({html: `Error submitting feedback 🐛\n${e.code}`, classes: 'rounded red'});
    }
  }

  /**
   * Update the firestore Feedback/{document} post with a new message
   * @param message: the updated string to overwrite the current message
   */
  editPost(message) {
    const html = '<p class="black-text text-accent-4">This functionality is still under construction 👷</p>';
    this.angular2MaterializeService.toast({
      html,
      classes: 'rounded  teal accent-1'
    });
    // await this.postRef.update({
    //   feedbackMessage: message
    // });
  }

  /**
   * Deletes a post in Feedback collection
   * @param postID: the document ID of the post to be deleted
   */
  async deletePost(postID) {
    try {
      await this.FeedbackCollection.doc(postID).delete();
      M.toast({html: `Post deleted! 💥`, classes: 'rounded blue'});
      console.log('Post was successfully deleted');
    } catch (e) {
      M.toast({html: `Error deleting post 🐛\n${e.code}`, classes: 'rounded red'});
      console.log(`${e.code}\n${e.message}\npostID:${postID}`);
    }
  }

  /**
   * Reply to a post in the Feedback collection
   * @param postID: the document ID of the post which is being replied to
   * @param reply: map of the userID who created it, their username, profile picture and the reply message
   */
  async reply(postID, reply) {
    try {
      await this.afs.collection(`Feedback/${postID}/replies`).add(reply);
      M.toast({html: `Reply: ${reply.message} `, classes: 'rounded blue'});
    } catch (e) {
      console.log(`${e.code}\n${e.message}`);
      M.toast({html: `Error submitting reply: ${e.code} `, classes: 'rounded red'});
    }
  }

  /**
   * Delete a reply in the Feedback/{id}/replies collection
   * @param replyID: the document ID of the reply which is being deleted
   */
  async deleteReply(replyID: string) {
    try {
      await this.feedbackRepliesCollection.doc(replyID).delete();
      M.toast({html: `Reply deleted! 💥`, classes: 'rounded blue'});
      console.log('Reply was successfully deleted');
    } catch (e) {
      M.toast({html: `Error deleting reply 🐛\n${e.code}`, classes: 'rounded red'});
      console.log(`${e.code}\n${e.message}\nReplyID:${replyID}`);
    }
  }

  /**
   * Get all the replies on a specific post from Feedback{document}/replies{document}
   * @param postID: the document ID of the post whose replies were querying
   */
  async getReplies(postID) {
    try {
      this.feedbackRepliesCollection = this.afs.collection<FeedbackRepliesInterface>(
        `Feedback/${postID}/replies`, ref => {
          return ref;
        });
      this.feedbackReplies = this.feedbackRepliesCollection.valueChanges({idField: 'id'});

      // determine if the post has any replies
      await this.feedbackReplies.pipe(take(1)).toPromise().then(value => {
        this.hasReplies = value.length > 0;
      });

    } catch (e) {
      M.toast({html: `Error getting replies 🐛: ${e.code} `, classes: 'rounded red'});
      this.hasReplies = false;
    }
    return this.hasReplies;
  }


}
