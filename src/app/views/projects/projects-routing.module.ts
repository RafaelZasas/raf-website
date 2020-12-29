import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WebDevComponent} from './web-dev/web-dev.component';
import {PasswordGeneratorComponent} from './python-projects/Password-Generator/password-generator.component';
import {TilesCalculatorComponent} from './JS-projects/tiles-calculator/tiles-calculator.component';
import {ProjectsComponent} from './projects.component';
import {AppDevComponent} from './app-dev/app-dev.component';


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
    path: 'python-dev',
    component: PasswordGeneratorComponent,
    data: {
      title: 'Python Projects'
    }
  },
  {
    path: 'js-dev',
    component: TilesCalculatorComponent,
    data: {
      title: 'JS Projects'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
