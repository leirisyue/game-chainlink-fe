/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';
import {
  NbActionsModule, NbButtonModule, NbContextMenuModule, NbIconModule, NbLayoutModule,
  NbMenuModule,
  NbSearchModule, NbSelectModule, NbSidebarModule, NbSpinnerModule,
  NbThemeModule, NbTooltipModule, NbUserModule
} from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import { I18nModule } from '../@core/utils/i18n.module';
import {
  FooterComponent,
  HeaderComponent,
  TinyMCEComponent
} from './components';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent
} from './layouts';
import {
  CapitalizePipe, MeasureConverterPipe, NumberWithCommasPipe, PluralPipe,
  RoundPipe,
  TimingPipe
} from './pipes';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { DARK_THEME } from './styles/theme.dark';
import { DEFAULT_THEME } from './styles/theme.default';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbSpinnerModule,
  NbEvaIconsModule,
  MatMenuModule,
  I18nModule,
  MatDividerModule,
  MatRadioModule,
  FormsModule,
  MatButtonModule,
  RouterModule,
  NbTooltipModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
];
const PIPES = [
  CapitalizePipe,
  MeasureConverterPipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, AuthModule, ...NB_MODULES],
  exports: [CommonModule, MatDialogModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES, BreadcrumbComponent],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
        ).providers,
      ],
    };
  }
}
