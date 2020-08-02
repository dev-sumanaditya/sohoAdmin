import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainComponent, ViewComponent, CreateComponent],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminsModule { }
