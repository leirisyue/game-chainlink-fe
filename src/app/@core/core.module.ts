/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NbAuthModule } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService
} from './services/utils';

import { CommonBackendModule } from './backend/common/common-backend.module';
import { SettingsService } from './backend/common/services/settings.service';
import { CommonMockModule } from './mock/common/common-mock.module';
import { IotMockModule } from './mock/iot/iot-mock.module';

export const NB_CORE_PROVIDERS = [
  ...CommonMockModule.forRoot().providers,
  ...CommonBackendModule.forRoot().providers,
  ...IotMockModule.forRoot().providers,

  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        SettingsService,
      ],
    };
  }
}
