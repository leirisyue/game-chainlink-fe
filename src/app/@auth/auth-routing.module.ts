import { NgxLoginSystemComponent } from './components/login-system/login-system.component';
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NgxAuthComponent,
  NgxLoginComponent, NgxRegisterComponent, NgxRequestPasswordComponent,
  NgxResetPasswordComponent
} from './components';
import { NgxActivateAccountComponent } from './components/activate-account/activate-account.component';
import { NgxCustomerComponent } from './components/login-customer/login-customer.component';

const routes: Routes = [{
  path: '',
  component: NgxAuthComponent,
  children: [
    {
      path: '',
      component: NgxLoginSystemComponent,
      // data: { title: 'Login' },
    },
    {
      path: 'login-system',
      component: NgxLoginSystemComponent,
      // data: { title: 'Login' },
    },
    {
      path: 'login-admin',
      component: NgxLoginComponent
      // data: { title: 'Login' },
    },
    {
      path: 'login',
      component: NgxCustomerComponent
      // data: { title: 'Login' },
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
