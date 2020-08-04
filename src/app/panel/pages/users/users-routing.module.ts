import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  {path: 'view/:id', component: ViewComponent},
  {path: '', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
