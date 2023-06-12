import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './@core/core.module';

import { AuthModule } from './@auth/auth.module';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  NbDatepickerModule,
  NbDialogModule, NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule
} from '@nebular/theme';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from './@core/backend/get/paginator-intl';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    AuthModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NgxSpinnerModule,
    MatIconModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }],
})
export class AppModule {
}
