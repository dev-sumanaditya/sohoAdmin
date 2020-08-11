import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ViewerComponent } from './viewer/viewer.component';
import { NewComponent } from './new/new.component';


const routes: Routes = [
  {path: 'new', component: NewComponent},
  {path: 'edit/:id', component: EditorComponent},
  {path: ':id', component: ViewerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
