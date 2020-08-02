import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPanelComponent } from './main-panel/main-panel.component';


const routes: Routes = [
  {path: '', component: MainPanelComponent, children: [
    {path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)},
    {path: 'instructors', loadChildren: () => import('./pages/instructors/instructors.module').then(m => m.InstructorsModule)},
    {path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)},
    {path: 'admins', loadChildren: () => import('./pages/admins/admins.module').then(m => m.AdminsModule)},
    {path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
    {path: 'website-settings', loadChildren: () => import('./pages/website/website.module').then(m => m.WebsiteModule)},
    {path: 'courses', loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule)},
    {path: '', redirectTo: 'dashboard'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
