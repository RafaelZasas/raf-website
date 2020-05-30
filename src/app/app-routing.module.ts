import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ProjectsComponent} from './projects/projects.component';
import {ResumeComponent} from './resume/resume.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {FeedbackComponent} from './feedback/feedback.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'resume', component: ResumeComponent},
  {path: 'aboutme', component: AboutMeComponent},
  {path: 'feedback', component: FeedbackComponent},
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
