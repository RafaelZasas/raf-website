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
import {ProjectsComponent} from './views/projects/projects.component';
import {ResumeComponent} from './views/resume/resume.component';
import {AboutMeComponent} from './views/about-me/about-me.component';
import {WebDevComponent} from './views/projects/web-dev/web-dev.component';
import {FeedbackComponent} from './views/feedback/feedback.component';
import {UserProfileComponent} from './views/user-profile/user-profile.component';
import {PasswordGeneratorComponent} from './views/projects/python-projects/Password-Generator/password-generator.component';
import {PeerAdvisingComponent} from './views/projects/peer-advising/peer-advising.component';
import {AddStudentInfoComponent} from './views/projects/peer-advising/add-student-info/add-student-info.component';
import {TilesCalculatorComponent} from './views/projects/JS-projects/tiles-calculator/tiles-calculator.component';


// FIREBASE IMPORTS

import {AngularFireModule} from '@angular/fire';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
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
    ProjectsComponent,
    ResumeComponent,
    AboutMeComponent,
    FeedbackComponent,
    PeerAdvisingComponent,
    AddStudentInfoComponent,
    UserProfileComponent,
    LoginComponent,
    PasswordGeneratorComponent,
    WebDevComponent,
    TilesCalculatorComponent,
    PasswordGeneratorComponent,
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
    AngularFirePerformanceModule,
    // OTHER IMPORTS
    FontAwesomeModule,
  ],
  providers: [
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
