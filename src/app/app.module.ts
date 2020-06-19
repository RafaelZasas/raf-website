// MODULE IMPORTS
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';

// COMPONENT IMPORTS
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ProjectsComponent} from './projects/projects.component';
import {ResumeComponent} from './resume/resume.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {FeedbackComponent} from './feedback/feedback.component';


// FIREBASE IMPORTS
import * as firebase from 'firebase/app';
import {AngularFireModule} from '@angular/fire';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProjectsComponent,
    ResumeComponent,
    AboutMeComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    AngularFirestoreModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
