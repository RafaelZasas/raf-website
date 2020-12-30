import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectsRoutingModule} from './projects-routing.module';
import {WebDevComponent} from './web-dev/web-dev.component';
import {TilesCalculatorComponent} from './JS-projects/tiles-calculator/tiles-calculator.component';
import {PasswordGeneratorComponent} from './python-projects/Password-Generator/password-generator.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProjectsComponent} from './projects.component';
import {AppDevComponent} from './app-dev/app-dev.component';
import {AppDetailsComponent} from './app-dev/app-details/app-details.component';
import {PythonProjectsComponent} from './python-projects/python-projects.component';
import {JSProjectsComponent} from './JS-projects/js-projects.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ProjectsComponent,
    WebDevComponent,
    TilesCalculatorComponent,
    PasswordGeneratorComponent,
    AppDevComponent,
    AppDetailsComponent,
    PythonProjectsComponent,
    JSProjectsComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class ProjectsModule {
}
