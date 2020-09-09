import {Component, OnDestroy, OnInit} from '@angular/core';
import M from 'materialize-css';
import {faJsSquare, faPython} from '@fortawesome/free-brands-svg-icons';
import {faFileCode} from '@fortawesome/free-regular-svg-icons';
import * as firebase from 'firebase/app';
// Add the Performance Monitoring library
import 'firebase/performance';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  perf = firebase.performance(); // initializes the firebase performance module
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened
  python = faPython;
  javascript = faJsSquare;
  web = faFileCode ;
  constructor(
  ) {
  }

  ngOnInit(): void {
    this.screenTrace = this.perf.trace('projectsScreen'); // trace name = loginScreen for tracking in FB
    this.screenTrace.start(); // start the timer
    const elems = document.querySelectorAll('.collapsible');
    const dropdown =  M.Collapsible.init(elems);
  }

  ngOnDestroy(): void {
    this.screenTrace.stop();
  }


}
