/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { I18nService } from '../@core/utils/i18n.service';
import { MessageService } from '../@core/utils/message.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private i18nService: I18nService,
    private translateService: TranslateService,
    private messageService: MessageService
  ) {
    if (!this.i18nService.getLocaleLanguage()) {
      this.i18nService.changeLanguage(this.i18nService.language);
    } else {
      this.i18nService.language = this.i18nService.getLocaleLanguage();
      this.translateService.use(this.i18nService.language);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const accessToken = this.authService.getJwtToken()
    const roles = route.data.role as string[]
    const title = route.data.title as string
    this.i18nService.translateTitlePage(title)
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false
    }
    return true
  }
}
