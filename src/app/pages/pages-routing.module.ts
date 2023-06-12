/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../@auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PagesComponent } from './pages.component';


export const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      data: { title: 'Dashboard' },
      canActivate: [AuthGuard],
      component: DashboardComponent,
    },
    {
      path: 'system',
      loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },
    {
      path: 'endpoint',
      loadChildren: () => import('./endpoint/endpoint.module').then(m => m.EndpointModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
