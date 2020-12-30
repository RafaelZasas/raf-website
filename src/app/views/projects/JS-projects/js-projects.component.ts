import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-js-projects',
  templateUrl: './js-projects.component.html',
  styleUrls: ['./js-projects.component.css',
    '../../../../../node_modules/bulma/css/bulma.css'
  ]
})
export class JSProjectsComponent implements OnInit {

  // specify data to be passed into each card for projects
  jsCards = [
    {
      img: 'assets/tiles-calculator.png',
      title: 'Tiles Calculator',
      subtitle: 'An app made for my dads business to help his workers calculate the pricing of tiles and associated products',
      alt: 'Eurotrend',
      link: 'tiles-calculator'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
