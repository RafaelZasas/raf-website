import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
// Add the Performance Monitoring library
import 'firebase/performance';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit, OnDestroy {
  width = '1920px';
  height = '1080px';

  perf = firebase.performance(); // initializes the firebase performance module
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened

  constructor() {
  }

  ngOnInit(): void {
    this.screenTrace = this.perf.trace('aboutMeScreen'); // trace name = loginScreen for tracking in FB
    this.screenTrace.start(); // start the timer
  }

  ngOnDestroy(): void {
    this.screenTrace.stop();
  }

}
