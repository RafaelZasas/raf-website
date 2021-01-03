import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/Auth/auth.service';
import {Angular2MaterializeV1Service} from 'angular2-materialize-v1';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  options = {
    preventScrolling: false
  };

  constructor(public auth: AuthService, private angular2MaterializeService: Angular2MaterializeV1Service) {
  }

  ngOnInit(): void {
    const elems = document.querySelectorAll('.sidenav');
    // initialize all Sidenavs with class .Sidenav
    this.angular2MaterializeService.initSidenav('.sidenav', this.options);

  }


}
