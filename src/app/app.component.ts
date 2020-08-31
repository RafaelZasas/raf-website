import {AfterViewInit, Component} from '@angular/core';
import {AngularFireAnalytics, DEBUG_MODE} from '@angular/fire/analytics';
import {AuthService} from './services/Auth/auth.service';

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
