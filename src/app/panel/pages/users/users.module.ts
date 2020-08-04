import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './view/view.component';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [MainComponent, ViewComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ClipboardModule
  ]
})
export class UsersModule { }
