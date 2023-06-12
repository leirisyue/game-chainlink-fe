import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from '../../auth.service';
import { getDeepFromObject } from '../../helpers';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NgxLogoutComponent implements OnInit {

  redirectDelay: number = this.getConfigValue('forms.logout.redirectDelay');

  constructor(protected authService: AuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.authService.logOut()
    // this.authService.logOut().subscribe(() => {
    // if (this.authService.isRole('ROLE_SYSTEM')) {
    //   this.router.navigateByUrl('auth/login-system');
    // } else {
    //   this.router.navigateByUrl('auth/login');
    // }

    // });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}