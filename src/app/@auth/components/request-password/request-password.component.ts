import { MessageService } from './../../../@core/utils/message.service';
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from '../../auth.service';
import { getDeepFromObject } from '../../helpers';
import { EMAIL_PATTERN } from '../constants';

@Component({
  selector: 'ngx-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  templateUrl: './request-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRequestPasswordComponent implements OnInit {
  redirectDelay: number = this.getConfigValue('forms.requestPassword.redirectDelay');
  showMessages: any = this.getConfigValue('forms.requestPassword.showMessages');
  strategy: string = this.getConfigValue('forms.requestPassword.strategy');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  requestPasswordForm: UntypedFormGroup;

  constructor(protected authService: AuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected fb: UntypedFormBuilder,
    private messageService: MessageService,
    protected router: Router) { }

  get email() { return this.requestPasswordForm.get('email'); }

  ngOnInit(): void {
    const emailValidators = [
      Validators.pattern(EMAIL_PATTERN),
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);

    this.requestPasswordForm = this.fb.group({
      email: this.fb.control('', [...emailValidators]),
    });
  }

  requestPass(): void {
    // this.messageService.showSpinner()
    // this.authService.requestPasswordReset(this.requestPasswordForm.value.email).subscribe((result: AccountDto) => {
    //   setTimeout(() => {
    //     this.messageService.hideSpinner()
    //     const text = `Vui lòng kiểm tra email ${this.requestPasswordForm.value.email} và đặt lại mật khẩu cho tài khoản.`
    //     this.messageService.successByText(text)
    //     return this.router.navigateByUrl('auth/login');
    //   }, this.redirectDelay);
    //   this.cd.detectChanges();
    // });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
