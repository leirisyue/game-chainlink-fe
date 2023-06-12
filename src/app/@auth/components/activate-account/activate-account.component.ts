import { MessageService } from './../../../@core/utils/message.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NB_AUTH_OPTIONS } from '@nebular/auth';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../auth.service';
import { getDeepFromObject } from '../../helpers';

@Component({
  selector: 'ngx-activate-account-page',
  styleUrls: ['./activate-account.component.scss'],
  templateUrl: './activate-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxActivateAccountComponent implements OnInit {
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay: number = this.getConfigValue('forms.resetPassword.redirectDelay');
  showMessages: any = this.getConfigValue('forms.resetPassword.showMessages');
  strategy: string = this.getConfigValue('forms.resetPassword.strategy');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');

  resetPasswordForm: UntypedFormGroup;

  constructor(protected authService: AuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    protected router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
      Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$')
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);
    this.resetPasswordForm = this.fb.group({
      key: this.fb.control('', [Validators.required]),
      newPassword: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
    });
    this.activatedRoute.params.subscribe(params => {
      const key = params['key']
      if (key) {
        this.resetPasswordForm.get('key').patchValue(key)
        // this.authService.findAccountByActivationKey(key).subscribe(data => this.account = data, () => this.resetPasswordForm.disable())
      } else {
        this.messageService.errorByText('Không tìm thấy mã kích hoạt!')
        this.resetPasswordForm.disable()
      }
    });
  }

  get key() { return this.resetPasswordForm.get('key'); }
  get password() { return this.resetPasswordForm.get('newPassword'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }


  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  // ------------ view pass------------
  showPassword = false;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
