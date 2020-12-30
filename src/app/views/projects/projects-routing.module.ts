import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WebDevComponent} from './web-dev/web-dev.component';
import {PasswordGeneratorComponent} from './python-projects/Password-Generator/password-generator.component';
import {TilesCalculatorComponent} from './JS-projects/tiles-calculator/tiles-calculator.component';
import {ProjectsComponent} from './projects.component';
import {AppDevComponent} from './app-dev/app-dev.component';
import {AppDetailsComponent} from './app-dev/app-details/app-details.component';
import {PythonProjectsComponent} from './python-projects/python-projects.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {JSProjectsComponent} from './JS-projects/js-projects.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    data: {
      title: 'projects'
    }
  },
  {
    path: 'web-dev',
    component: WebDevComponent,
    data: {
      title: 'Web Development'
    }
  },
  {
    path: 'app-dev',
    component: AppDevComponent,
    data: {
      title: 'Mobile App Development'
    }
  },
  {
    path: 'app-dev/app-details',
    component: AppDetailsComponent,
    data: {
      title: 'App Details'
    }
  },
  {
    path: 'python-dev',
    component: PythonProjectsComponent,
    data: {
      title: 'Python Projects'
    }
  },
  {
    path: 'python-dev/password-generator',
    component: PasswordGeneratorComponent,
    data: {
      title: 'Password Generator'
    }
  },
  {
    path: 'js-dev',
    component: JSProjectsComponent,
    data: {
      title: 'JS Projects'
    }
  },
  {
    path: 'js-dev/tiles-calculator',
    component: TilesCalculatorComponent,
    data: {
      title: 'Tiles Calculator'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
