import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './views/home/home.component';
import {ProjectsComponent} from './views/projects/projects.component';
import {ResumeComponent} from './views/resume/resume.component';
import {AboutMeComponent} from './views/about-me/about-me.component';
import {FeedbackComponent} from './views/feedback/feedback.component';
import {PeerAdvisingComponent} from './views/projects/peer-advising/peer-advising.component';
import {UserProfileComponent} from './views/user-profile/user-profile.component';
import {AuthGuard} from './services/Auth/auth.guard';
import {LoginComponent} from './views/auth/login/login.component';
import {RegisterComponent} from './views/auth/register/register.component';
import {TilesCalculatorComponent} from './views/projects/JS-projects/tiles-calculator/tiles-calculator.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'resume', component: ResumeComponent},
  {path: 'aboutme', component: AboutMeComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'fys2020', component: PeerAdvisingComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'tilecalculator', component: TilesCalculatorComponent},
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
