/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';
import { I18nService } from '../../@core/utils/i18n.service';


@Component({
  selector: 'ngx-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <div class="pyramid"></div>
            <div class="col-sm-5 align-self-center">
              <div style="z-index: 2;">
                <h1 class="text-black text-center mr-5">STID FIDO2 System</h1>
              </div>
            </div>
            <div class="col-sm-7 align-self-center" style="z-index: 2;">
                <router-outlet></router-outlet>
            </div>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NgxAuthComponent implements OnDestroy {

  private alive = true;
  subscription: any;
  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(
    public i18nService: I18nService,
    public translateService: TranslateService,
    protected auth: NbAuthService,
    protected location: Location) {
    if (!this.i18nService.getLocaleLanguage()) {
      this.i18nService.changeLanguage(this.i18nService.language);
    } else {
      this.i18nService.language = this.i18nService.getLocaleLanguage();
      this.translateService.use(this.i18nService.language);
    }
    this.subscription = auth.onAuthenticationChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  back() {
    this.location.back();
    return false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
