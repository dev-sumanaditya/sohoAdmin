import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { ApplicationsComponent } from './applications/applications.component';
import { CreateComponent } from './create/create.component';
import { ApplicationViewerComponent } from './application-viewer/application-viewer.component';


const routes: Routes = [
  {path: 'applications', component: ApplicationsComponent},
  {path: 'info/:id', component: InfoComponent},
  {path: 'create', component: CreateComponent},
  {path: 'view-application/:id', component: ApplicationViewerComponent},
  {path: '', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorsRoutingModule { }
