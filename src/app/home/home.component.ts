import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AngularFireAnalytics} from '@angular/fire/analytics';
import * as firebase from 'firebase';
import M from 'materialize-css';
import {AuthService} from '../services/Auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../node_modules/materialize-css/dist/css/materialize.min.css', './home.component.css']
})
export class HomeComponent implements AfterViewInit {
  analytics: AngularFireAnalytics;

  constructor(private auth: AuthService) {
  }

   ngAfterViewInit(): void {
     this.auth.user$.subscribe(console.log);
     this.auth.getUser().then(user => {
        if (!user) {
          console.log('not logged in');
         this.displayToast(`Hey New User! Please Consider Leaving Feedback`);
        } else {
          console.log(`logged in as ${user.displayName}`);
        }
      }
    );

  }

  ResumeClick() {
    this.analytics.logEvent('page_view', {page_title: 'resume', name: 'resume clicked'});
    firebase.analytics().logEvent('Resume Click', {name: 'Resume CLick'});
  }

  displayToast(message){
    M.toast({html: `${message}`, classes: 'rounded green', displayLength: 5000});
  }


}
