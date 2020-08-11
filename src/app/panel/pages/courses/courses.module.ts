import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { QuillModule } from 'ngx-quill';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [MainComponent, CreateComponent, ViewComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    QuillModule.forRoot(),
    ImageCropperModule
  ]
})
export class CoursesModule { }
