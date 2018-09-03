import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationGuard } from '../loginAuth/authGuard';


const dashboardRoutes: Routes = [
  { 
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      // {
      //   path: '',
      //   component: 
      // }
    ]
  }
];


@NgModule({
  imports: [ 
    RouterModule.forChild(
        dashboardRoutes,
    //his outputs each router event that took place during each navigation lifecycle to the browser console
    //{ enableTracing: true } // <-- debugging purposes only
    ) 
  ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule {}