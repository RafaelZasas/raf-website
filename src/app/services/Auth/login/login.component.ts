import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

import {
  faGoogle
} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  google = faGoogle;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

}
