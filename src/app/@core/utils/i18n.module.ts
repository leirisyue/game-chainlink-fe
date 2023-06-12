import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json')
}

export const TranslateConfig = {
  provide: TranslateLoader,
  useFactory: HttpLoaderFactory,
  deps: [HttpClient]
}

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forChild({
      loader: TranslateConfig,
      isolate: false,
      extend: true,
      // defaultLanguage: LocalKey.VI
    }),
  ],
  exports: [
    TranslateModule,
  ],
  providers: [TranslateStore]
})
export class I18nModule { }
