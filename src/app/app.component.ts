import {AfterViewInit, Component} from '@angular/core';
import {AngularFireAnalytics, DEBUG_MODE} from '@angular/fire/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'raf-website';

  constructor() {

  }

  ngAfterViewInit(): void {
  }
}
