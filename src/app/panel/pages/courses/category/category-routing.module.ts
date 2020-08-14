import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {path: 'edit/:id', component: EditComponent},
  {path: '', component: DefaultComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
