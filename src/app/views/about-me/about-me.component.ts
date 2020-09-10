import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
// Add the Performance Monitoring library
import 'firebase/performance';


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit, OnDestroy {

  perf = firebase.performance(); // initializes the firebase performance module
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened

  constructor() { }

  ngOnInit(): void {
    this.screenTrace = this.perf.trace('aboutMeScreen'); // trace name = loginScreen for tracking in FB
    this.screenTrace.start(); // start the timer
  }

  ngOnDestroy(): void {
    this.screenTrace.stop();
  }

}
