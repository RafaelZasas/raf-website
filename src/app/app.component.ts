import {AfterViewInit, Component} from '@angular/core';
import {AuthService} from './services/Auth/auth.service';
import 'firebase/performance';
import 'firebase/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Raff\'s website';

  constructor(public auth: AuthService) {

  }

  ngAfterViewInit(): void {

  }
}
