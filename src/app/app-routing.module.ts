import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ProjectsComponent} from './projects/projects.component';
import {ResumeComponent} from './resume/resume.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {PeerAdvisingComponent} from './projects/peer-advising/peer-advising.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AuthGuard} from './services/Auth/auth.guard';
import {LoginComponent} from './services/Auth/login/login.component';
import {TilesCalculatorComponent} from './projects/JS-projects/tiles-calculator/tiles-calculator.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'resume', component: ResumeComponent},
  {path: 'aboutme', component: AboutMeComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'fys2020', component: PeerAdvisingComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'tilecalculator', component: TilesCalculatorComponent},
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
