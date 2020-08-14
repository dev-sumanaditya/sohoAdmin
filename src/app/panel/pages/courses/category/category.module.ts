import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { DefaultComponent } from './default/default.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [DefaultComponent, EditComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
