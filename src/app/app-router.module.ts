import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuardGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRouterModule { }
