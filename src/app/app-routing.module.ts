import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AntiAuthGuard } from './helpers/helpers/antiauth.guard';
import { AuthGuard } from './helpers/helpers/auth.guard';


const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [AntiAuthGuard]},
  {path: '', loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule), canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
