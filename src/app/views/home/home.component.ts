import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {AngularFireAnalytics} from '@angular/fire/analytics';
import M from 'materialize-css';
import {AuthService} from '../../services/Auth/auth.service';
import * as firebase from 'firebase/app';
// Add the Performance Monitoring library
import 'firebase/performance';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  analytics: AngularFireAnalytics;
  perf = firebase.performance(); // initializes the firebase performance module
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened

  constructor(private auth: AuthService) {
  }

   ngAfterViewInit(): void {
     this.screenTrace = this.perf.trace('aboutMeScreen'); // trace name = loginScreen for tracking in FB
     this.screenTrace.start(); // start the timer
     this.auth.user$.subscribe(console.log);
     this.auth.getUser().then(user => {
        if (!user) {
          console.log('not logged in');
          this.displayToast(`Hey New User! Please Consider Leaving Feedback`);
        } else {
          console.log(`logged in as ${user.username}`);
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.screenTrace.stop();
  }


  displayToast(message){
    M.toast({html: `${message}`, classes: 'rounded green', displayLength: 5000});
  }


}
