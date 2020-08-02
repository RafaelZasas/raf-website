import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

import {
  faRaspberryPi,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import {faPhone, faSwimmer} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';

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
