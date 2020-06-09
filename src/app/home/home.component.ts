import {Component, OnInit} from '@angular/core';
import {AngularFireAnalytics} from '@angular/fire/analytics';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../node_modules/materialize-css/dist/css/materialize.min.css', './home.component.css']
})
export class HomeComponent implements OnInit {
  analytics: AngularFireAnalytics;

  constructor() {
  }

  ngOnInit(): void {
  }

  ResumeClick() {
    this.analytics.logEvent('page_view', {page_title: 'resume', name : 'resume clicked'});
    firebase.analytics().logEvent('PhoneCall', {name: 'Phone Lead'});
  }
}
