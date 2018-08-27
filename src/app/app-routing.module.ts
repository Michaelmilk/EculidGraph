import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }  from './components/trivial/pageNotFound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/loginAuth/login/login.component';
import { LogoutComponent } from './components/loginAuth/logout/logout.component';
import { AuthenticationGuard } from './components/loginAuth/authGuard';

let allRoutes: Routes = [];

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
	{ path: "logout", component: LogoutComponent },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthenticationGuard]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

const wildcardRoutes: Routes = [
  { path: '**', component: PageNotFoundComponent }
];

allRoutes = allRoutes.concat(appRoutes, wildcardRoutes);

@NgModule({
  imports: [ RouterModule.forRoot(
    allRoutes,
    //his outputs each router event that took place during each navigation lifecycle to the browser console
    //{ enableTracing: true } // <-- debugging purposes only
  ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}