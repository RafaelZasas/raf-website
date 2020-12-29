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
  styleUrls: ['./projects.component.css',
  '../../../../node_modules/bulma/css/bulma.css',
  ]
})
export class ProjectsComponent implements OnInit, OnDestroy {

  // specify data to be passed into each card for projects
  projectCards = [
    {img: 'assets/web-dev.png', title: 'Websites', alt: 'Web Dev', link: 'web-dev'},
    {img: 'assets/mobile-dev.png', title: 'Mobile Apps', alt: 'Apps Dev', link: 'app-dev'},
    {img: 'assets/python-dev.png', title: 'Python Projects', alt: 'Python Dev', link: 'python-dev'},
    {img: 'assets/javascript-dev.png', title: 'Javascript Projects', alt: 'Javascript Dev', link: 'js-dev'},
  ];

  perf = firebase.performance(); // initializes the firebase performance module
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.screenTrace = this.perf.trace('projectsScreen'); // trace name = loginScreen for tracking in FB
    this.screenTrace.start(); // start the timer
  }

  ngOnDestroy(): void {
    this.screenTrace.stop();
  }


}
