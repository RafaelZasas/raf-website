// ANGULAR MODULE IMPORTS
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// COMPONENT IMPORTS

// auth components
import {LoginComponent} from './views/auth/login/login.component';
import {RegisterComponent} from './views/auth/register/register.component';

// base components
import {AppComponent} from './app.component';
import {HeaderComponent} from './views/header/header.component';
import {FooterComponent} from './views/footer/footer.component';

// views
import {HomeComponent} from './views/home/home.component';
import {ResumeComponent} from './views/resume/resume.component';
import {AboutMeComponent} from './views/about-me/about-me.component';
import {FeedbackComponent} from './views/feedback/feedback.component';
import {UserProfileComponent} from './views/user-profile/user-profile.component';
import {PeerAdvisingComponent} from './views/projects/peer-advising/peer-advising.component';
import {AddStudentInfoComponent} from './views/projects/peer-advising/add-student-info/add-student-info.component';

// FIREBASE IMPORTS

import {AngularFireModule} from '@angular/fire';
import {AngularFirePerformanceModule, PerformanceMonitoringService} from '@angular/fire/performance';
import {AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService, CONFIG } from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

// OTHER MODULE IMPORTS
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

// environment imports
import {environment} from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ResumeComponent,
    AboutMeComponent,
    FeedbackComponent,
    PeerAdvisingComponent,
    AddStudentInfoComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    // ANGULAR MODULE IMPORTS
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ANGULAR FIREBASE MODULE IMPORTS
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    // OTHER IMPORTS
    FontAwesomeModule,
  ],
  providers: [
    PerformanceMonitoringService, // enable performance monitoring across the entire site
    ScreenTrackingService, // auto logs screen_view events with the router module
    UserTrackingService, // tracks the users. auto sets setuserid and setUserProperties.
    { provide: CONFIG, useValue: {
        send_page_view: true,
        allow_ad_personalization_signals: true,
        anonymize_ip: false
      } }  // send custom config data to analytics
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
