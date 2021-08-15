import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './views/home/home.component';
import {ResumeComponent} from './views/resume/resume.component';
import {AboutMeComponent} from './views/about-me/about-me.component';
import {FeedbackComponent} from './views/feedback/feedback.component';
import {PeerAdvisingComponent} from './views/projects/peer-advising/peer-advising.component';
import {UserProfileComponent} from './views/user-profile/user-profile.component';
import {AuthGuard} from './services/Auth/auth.guard';
import {LoginComponent} from './views/auth/login/login.component';
import {RegisterComponent} from './views/auth/register/register.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {TestingComponent} from './views/testing/testing.component';


const routes: Routes = [
  {path: '.well-known/acme-challenge/-B6uoJ_P0gc5Fkd7hxe2U9x560_wrYoZKxi7ftVT9lI',
    component: TestingComponent},
  {path: '', component: HomeComponent},
  {path: 'resume', component: ResumeComponent},
  {path: 'aboutme', component: AboutMeComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'fys2020', component: PeerAdvisingComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'projects', loadChildren: () =>
      import('./views/projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: '404'
    }
  }

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
