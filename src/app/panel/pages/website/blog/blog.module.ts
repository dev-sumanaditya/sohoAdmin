import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { EditorComponent } from './editor/editor.component';

import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NewComponent } from './new/new.component';
import { ToastrModule } from 'ngx-toastr';
import { NgToggleModule } from 'ng-toggle-button';

@NgModule({
  declarations: [
    EditorComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    QuillModule.forRoot(),
    FormsModule,
    ImageCropperModule,
    ToastrModule,
    NgToggleModule
  ]
})
export class BlogModule { }
