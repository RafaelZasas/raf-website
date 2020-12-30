import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-python-projects',
  templateUrl: './python-projects.component.html',
  styleUrls: ['./python-projects.component.css',
    '../../../../../node_modules/bulma/css/bulma.css'
  ]
})
export class PythonProjectsComponent implements OnInit {

  // specify data to be passed into each card for projects
  pythonCards = [
    {
      img: 'assets/password-generator.png',
      title: 'Random Password Generator',
      alt: 'Password Generator',
      link: 'password-generator'},
    {
      img: 'assets/foxbot.png',
      title: 'FoxBot',
      alt: 'FoxBot',
      link: 'fox-bot'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
