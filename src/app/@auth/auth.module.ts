import { NgxLoginSystemComponent } from './components/login-system/login-system.component';
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { CommonModule } from '@angular/common';
import { HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  NbAuthModule, NbTokenLocalStorage
} from '@nebular/auth';
import { NbSecurityModule } from '@nebular/security';
import { NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbRadioModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { ComponentsModule } from '../@components/components.module';
import { I18nModule } from '../@core/utils/i18n.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { authOptions } from './auth.settings';
import {
  NgxAuthComponent, NgxLoginComponent,
  NgxRegisterComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent
} from './components';
import { NgxActivateAccountComponent } from './components/activate-account/activate-account.component';
import { RegisterBusinessComponent } from './components/register/register-business/register-business.component';
import { RegisterUserComponent } from './components/register/register-user/register-user.component';
import { CanActivateViaLoginGuard } from './login-guard';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NgxCustomerComponent } from './components/login-customer/login-customer.component';
import { ReactiveFormsModule } from '@angular/forms';

const GUARDS = [AuthGuard, CanActivateViaLoginGuard];
const COMPONENTS = [
  NgxLoginComponent,
  NgxAuthComponent,
  NgxRegisterComponent,
  RegisterUserComponent,
  RegisterBusinessComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
  NgxActivateAccountComponent,
  NgxLoginSystemComponent,
  NgxCustomerComponent
];

const NB_MODULES = [
  NbIconModule,
  NbLayoutModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
  NbRadioModule,
  I18nModule,
  NbInputModule,
  NbFormFieldModule,
  NbSelectModule,
  NbTabsetModule,
  NbDatepickerModule,
  NbDateFnsDateModule
];

export function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return ['/auth/login', '/auth/sign-up', '/auth/request-pass', '/auth/refresh-token']
    .some(url => req.url.includes(url));
}

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    ...NB_MODULES,
    NbAuthModule.forRoot(authOptions),
    I18nModule
  ],
  providers: [
    NbSecurityModule.forRoot({
    }).providers,
    {
      provide: NbTokenLocalStorage, useClass: NbTokenLocalStorage,
    },
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        // { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
        // { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, ...GUARDS],
    };
  }
}
