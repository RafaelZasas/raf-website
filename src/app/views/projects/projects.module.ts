import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import {WebDevComponent} from './web-dev/web-dev.component';
import {TilesCalculatorComponent} from './JS-projects/tiles-calculator/tiles-calculator.component';
import {PasswordGeneratorComponent} from './python-projects/Password-Generator/password-generator.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProjectsComponent} from './projects.component';
import { AppDevComponent } from './app-dev/app-dev.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    WebDevComponent,
    TilesCalculatorComponent,
    PasswordGeneratorComponent,
    AppDevComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProjectsModule { }
