import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/Auth/auth.service';

import {
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import * as firebase from 'firebase/app';
// Add the Performance Monitoring library
import 'firebase/performance';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  google = faGoogle;
  perf = firebase.performance(); // initializes the firebase performance module
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.screenTrace = this.perf.trace('aboutMeScreen'); // trace name = loginScreen for tracking in FB
    this.screenTrace.start(); // start the timer
  }

  ngOnDestroy(): void {
    this.screenTrace.stop();
  }


}
