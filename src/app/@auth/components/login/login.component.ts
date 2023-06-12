import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthSocialLink, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DATABASE_ID } from '../../../@core/interfaces/variable';
import { AuthService } from '../../auth.service';
import { getDeepFromObject } from '../../helpers';
import { MessageService } from '../../../@core/utils/message.service';
import { CookieService } from 'ngx-cookie-service';
import { Role } from '../../../@core/interfaces/enum';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NgxLoginComponent implements OnInit {

  minLength: number = this.getConfigValue('forms.validation.clientSecret.minLength');
  maxLength: number = this.getConfigValue('forms.validation.clientSecret.maxLength');
  redirectDelay: number = this.getConfigValue('forms.clientId.redirectDelay');
  showMessages: any = this.getConfigValue('forms.clientId.showMessages');
  strategy: string = this.getConfigValue('forms.clientId.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.clientId.socialLinks');
  remember = this.getConfigValue('forms.clientId.remember');
  errors: string[] = [];
  messages: string[] = [];
  loginForm: UntypedFormGroup;
  get clientId() { return this.loginForm.get('clientId'); }
  get clientSecret() { return this.loginForm.get('clientSecret'); }

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
    this.loginForm = this.fb.group({
      clientId: this.fb.control(''),
      clientSecret: this.fb.control(''),
      timeoutInSeconds: this.fb.control(0),
      rememberMe: this.fb.control(false),
    });
  }

  startLogin() {
    let rememberMe = this.loginForm.get('rememberMe').value
    this.loginForm.value.clientId = this.loginForm.value.clientId.replaceAll(' ', '')
    this.loginForm.value.clientSecret = this.loginForm.value.clientSecret.replaceAll(' ', '')
    if (rememberMe) {
      this.loginForm.value.timeoutInSeconds = 86400
    } else {
      this.loginForm.value.timeoutInSeconds = 3600
    }
    const data = JSON.stringify(this.loginForm.value);

    this.authService.generateEndpointAccessToken(data).subscribe(response => {
      if (response.token) {
        this.authService.storeTokens(response)
        if (response.subject) {
          this.authService.subject = Role.USER
          this.router.navigate(['/home'], { replaceUrl: true })
          // } else {
          //   this.router.navigate(['/home'], { replaceUrl: true })
        }
      } else {
        this.messageService.errorByText(response.subject)
      }
    })
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngOnDestroy(): void {
  }
}
