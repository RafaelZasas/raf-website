import {Component, OnInit} from '@angular/core';
import M from 'materialize-css';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../node_modules/materialize-css/dist/css/materialize.min.css', './header.component.css']
})
export class HeaderComponent implements OnInit {
  options = {
    preventScrolling: false
  };

  constructor() {
  }

  ngOnInit(): void {
    const elems = document.querySelectorAll('.sidenav');
    const inst = M.Sidenav.init(elems);
  }

}
