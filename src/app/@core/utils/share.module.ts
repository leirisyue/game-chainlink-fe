import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ThemeModule } from '../../@theme/theme.module';
import { I18nModule } from './i18n.module';

import { NgScrollbarModule } from 'ngx-scrollbar';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')
}

export const TranslateConfig = {
  provide: TranslateLoader,
  useFactory: HttpLoaderFactory,
  deps: [HttpClient]
}

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    I18nModule,
    NgScrollbarModule
  ]
})
export class SharedModule { }
