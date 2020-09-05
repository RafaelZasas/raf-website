// ANGULAR MODULE IMPORTS
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// COMPONENT IMPORTS
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ProjectsComponent} from './projects/projects.component';
import {ResumeComponent} from './resume/resume.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {LoginComponent} from './services/Auth/login/login.component';
import {PasswordGeneratorComponent} from './projects/python-projects/password-generator/password-generator.component';
import {PeerAdvisingComponent} from './projects/peer-advising/peer-advising.component';
import {AddStudentInfoComponent} from './projects/peer-advising/add-student-info/add-student-info.component';
import {TilesCalculatorComponent} from './projects/JS-projects/tiles-calculator/tiles-calculator.component';
import {WebDevComponent} from './projects/web-dev/web-dev.component';

// FIREBASE IMPORTS

import {AngularFireModule} from '@angular/fire';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

// OTHER MODULE IMPORTS
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

// environment imports
import {environment} from '../environments/environment';
import { RegisterComponent } from './services/Auth/register/register.component';


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
    // OTHER IMPORTS
    FontAwesomeModule,
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
