import { NbIconModule } from '@nebular/theme';
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { NotFoundServerComponent } from './not-found-server/not-found-server.component';


@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    ErrorRoutingModule,
    NbLayoutModule,
    NbIconModule
  ],
  declarations: [
    ErrorComponent,
    NotFoundServerComponent,
  ],
})
export class ErrorModule { }
