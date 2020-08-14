import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  {path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)},
  {path: 'view/:id', component: ViewComponent},
  {path: 'create', component: CreateComponent},
  {path: '', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
