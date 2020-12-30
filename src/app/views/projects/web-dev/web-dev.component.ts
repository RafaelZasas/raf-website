import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-dev',
  templateUrl: './web-dev.component.html',
  styleUrls: ['./web-dev.component.css',
    '../../../../../node_modules/bulma/css/bulma.css',
  ]
})
export class WebDevComponent implements OnInit {

  // specify data to be passed into each card for projects
  websiteCards = [
    {
      img: 'assets/raff-site.JPG',
      title: 'This site - which will be be updated frequently. Be sure to come back often!',
      alt: 'My Site',
      link: 'https://rafael-zasas.firebaseapp.com/'},
    {
      img: 'assets/dsc-ur-site.JPG',
      title: 'The official website for the Developers Student Club at the University of Redlands',
      alt: 'DSC UR',
      link: 'https://dsc-ur.web.app/'},
    {
      img: 'assets/andrew-site.JPG',
      title: 'Resume site for my friend who is fantastic videographer.',
      alt: 'Andrew Site',
      link: 'https://andrew-brown-productions.firebaseapp.com/'},
    {
      img: 'assets/intro-firebase-site.png',
      title: 'Site I made for the intro to firebase series with Google DSC',
      alt: 'intro to firebase',
      link: 'https://ecommerce-with-firebase-a7af6.web.app/'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  routeToSite() {
  }
}
