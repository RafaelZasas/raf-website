import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-dev',
  templateUrl: './app-dev.component.html',
  styleUrls: ['./app-dev.component.css',
    '../../../../../node_modules/bulma/css/bulma.css'
  ]
})
export class AppDevComponent implements OnInit {

  // specify data to be passed into each card for projects
  appCards = [
    {
      img: 'assets/raff-app.jpg',
      title: 'My Personal App',
      subtitle: 'A resume app which mirrors this site',
      alt: 'My App',
      link: 'app-details'},
    {
      img: 'assets/redlands-strong.jpg',
      title: 'Redlands Strong',
      subtitle: 'A review app for the local businesses of Redlands California',
      alt: 'Redlands Strong',
      link: 'app-details'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
