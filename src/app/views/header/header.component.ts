import {Component, OnInit} from '@angular/core';
import M from 'materialize-css';
import {AuthService} from '../../services/Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  options = {
    preventScrolling: false
  };

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    const elems = document.querySelectorAll('.sidenav');
    const inst = M.Sidenav.init(elems, this.options);
  }



}
