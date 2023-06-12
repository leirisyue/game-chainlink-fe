/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { NbAutocompleteModule, NbFormFieldModule, NbInputModule, NbMenuModule } from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesMenu } from './pages-menu';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../@core/utils/share.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SeparatorModule } from '../pipes/separator/separator.module';
import { InfoFormComponent } from './dashboard/info-form/info-form.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../@components/components.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    AuthModule.forRoot(),
    MatTableModule,
    SharedModule,
    MatPaginatorModule,
    SeparatorModule,
    NbInputModule,
    NbAutocompleteModule,

    FormsModule,

    ComponentsModule,
    NbFormFieldModule

  ],
  declarations: [
    ...PAGES_COMPONENTS,
    DashboardComponent,
    InfoFormComponent,
  ],
  providers: [
    PagesMenu,
  ],
})
export class PagesModule {
}
