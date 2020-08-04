import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorsRoutingModule } from './instructors-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { InfoComponent } from './info/info.component';
import { ApplicationsComponent } from './applications/applications.component';
import { CreateComponent } from './create/create.component';
import { ApplicationViewerComponent } from './application-viewer/application-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    InfoComponent,
    ApplicationsComponent,
    CreateComponent,
    ApplicationViewerComponent
  ],
  imports: [
    CommonModule,
    InstructorsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InstructorsModule { }
