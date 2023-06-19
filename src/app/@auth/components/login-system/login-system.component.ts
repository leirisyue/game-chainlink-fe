import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthSocialLink, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DATABASE_ID, PARTITION_ID } from '../../../@core/interfaces/variable';
import { AuthService } from '../../auth.service';
import { getDeepFromObject } from '../../helpers';
import { MessageService } from '../../../@core/utils/message.service';
import { CookieService } from 'ngx-cookie-service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Role } from '../../../@core/interfaces/enum';

@Component({
  selector: 'ngx-login',
  templateUrl: './login-system.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NgxLoginSystemComponent implements OnInit {

  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay: number = this.getConfigValue('forms.account.redirectDelay');
  showMessages: any = this.getConfigValue('forms.account.showMessages');
  strategy: string = this.getConfigValue('forms.account.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.account.socialLinks');
  remember = this.getConfigValue('forms.account.remember');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');

  errors: string[] = [];
  messages: string[] = [];
  loginForm: UntypedFormGroup;

  get account() { return this.loginForm.get('account'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    protected authService: AuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected themeService: NbThemeService,
    private fb: UntypedFormBuilder,
    protected router: Router,
    private dialogService: NbDialogService,
    public translateService: TranslateService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private cookieService: CookieService,

  ) {
    if (this.authService.isAuthenticated() && localStorage.getItem(DATABASE_ID) && this.cookieService.get(DATABASE_ID)) {
      this.router.navigateByUrl('pages/dashboard');
    }
  }

  ngOnInit(): void {
    const emailValidators = [
      // Validators.pattern(EMAIL_PATTERN),
      // Validators.pattern('^(?=[a-z0-9._@-]{3,100}$)(?!.*[._@-]{2})[^._@-].*[^._@-]$')
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      // Validators.minLength(8),
      // Validators.maxLength(32)
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.loginForm = this.fb.group({
      account: this.fb.control('', [...emailValidators]),
      password: this.fb.control('', [...passwordValidators]),
      remember: this.fb.control(false),
    });
  }

  startLogin() {
    const data = JSON.stringify(this.loginForm.value);
    this.authService.generateSystemAccessToken(data).subscribe(response => {
      // 
      if (response.token) {
        this.authService.storeTokens(response)
        if (response.subject) {
          this.authService.subject = Role.SYSTEM
          this.router.navigate(['/dashboard'], { replaceUrl: true })
        }
      } else {
        this.messageService.errorByText(response.subject)
      }
    })
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

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

  ngOnDestroy(): void {
  }
}
