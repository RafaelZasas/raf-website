import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireAnalytics} from '@angular/fire/analytics';
import M from 'materialize-css';
import {take} from 'rxjs/operators';


export interface FeedbackInterface {
  uid: string;
  username?: string;
  email: string;
  profilePhoto?: string;
  permissions?: string;
  feedbackMessage: string;
  feedbackType: string;
  postID?: string;
  replies: FeedbackRepliesInterface;
}

export interface FeedbackRepliesInterface {
  message: string;
  profilePhoto: string;
  uid: string;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  usersCollection: AngularFirestoreCollection<FeedbackInterface>; // passing the interface : Feedback
  feedbackMessages: Observable<FeedbackInterface[]>;

  feedbackRepliesCollection: AngularFirestoreCollection<FeedbackRepliesInterface>;
  feedbackReplies: Observable<FeedbackRepliesInterface[]>;

  postRef: AngularFirestoreDocument<any>;
  post$: Observable<any>; // observable of data within the post
  hasReplies: boolean;


  constructor(    // inject imports for fire store auth service in constructor
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private analytics: AngularFireAnalytics) {
  }


  /**
   * Retrieve all the feedback posts from firestore in the Feedback/ collection and subscribe to the changes
   */
  async getPosts() {
    try {
      // INIT CONNECTION TO FIRESTORE COLLECTION
      this.usersCollection = this.afs.collection<FeedbackInterface>
      ('Feedback', ref => { // collection to store firestore data
        return ref;
      }); // reference
      // SUBSCRIBE TO THE CHANGES
      this.feedbackMessages = await this.usersCollection.valueChanges({idField: 'id'});
    } catch (e) {
      console.log(`${e.code}\n${e.message}`);
      M.toast({html: `Error getting feedback\n${e.code}`, classes: 'rounded red'});
    }

  }

  /**
   * Create a new firestore data entry of Feedback/{document}
   * @param formData: Map of the feedback type, message and user who created it.
   */
  async createPost(formData) {
    try {
      await this.usersCollection.add(formData);
      console.log('stored feedback successfully');
      M.toast({html: 'Thank you !', classes: 'rounded blue'});
      await this.analytics.logEvent('feedbackService', {serviceName: 'Feedback Submitted'});
    } catch (e) {
      console.log(`${e.code}\n${e.message}`);
      M.toast({html: `Error submitting feedback\n${e.code}`, classes: 'rounded red'});
    }
  }

  /**
   * Update the firestore Feedback/{document} post with a new message
   * @param message: the updated string to overwrite the current message
   */
  async editPost(message) {
    await this.postRef.update({
      feedbackMessage: message
    });
  }

  /**
   * Deletes a post in Feedback collection
   * @param postID: the document ID of the post to be deleted
   */
  async deletePost(postID) {
    try {
      await this.usersCollection.doc(postID).delete();
      M.toast({html: `Post deleted!`, classes: 'rounded blue'});
      console.log('Post was successfully deleted');
    } catch (e) {
      M.toast({html: `Error deleting post\n${e.code}`, classes: 'rounded red'});
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
      M.toast({html: `Error getting replies: ${e.code} `, classes: 'rounded red'});
      this.hasReplies = false;
    }
    return this.hasReplies;
  }


}
