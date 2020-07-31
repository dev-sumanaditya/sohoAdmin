import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { EditorComponent } from './editor/editor.component';
import { PreviewComponent } from './preview/preview.component';


@NgModule({
  declarations: [EditorComponent, PreviewComponent],
  imports: [
    CommonModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
