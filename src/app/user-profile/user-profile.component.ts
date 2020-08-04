import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/Auth/auth.service';
import {Router} from '@angular/router';
import {
  faGoogle
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  google = faGoogle;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public redirect() {
    this.router.navigate(['/login']);
  }

}
