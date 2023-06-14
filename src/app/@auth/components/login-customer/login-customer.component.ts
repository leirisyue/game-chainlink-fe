import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { Role, Status } from '../../../@core/interfaces/enum';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { RelyingPartyDto } from '../../../@core/interfaces/system/relying-party';
import { CustomService } from '../../../@core/services/custom.service';


@Component({
  selector: 'ngx-login-customer',
  templateUrl: './login-customer.component.html'
})
export class NgxCustomerComponent implements OnInit {

  minLength: number = this.getConfigValue('forms.validation.username.minLength');
  maxLength: number = this.getConfigValue('forms.validation.username.maxLength');
  redirectDelay: number = this.getConfigValue('forms.password.redirectDelay');
  showMessages: any = this.getConfigValue('forms.password.showMessages');
  strategy: string = this.getConfigValue('forms.password.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.password.socialLinks');
  remember = this.getConfigValue('forms.password.remember');
  errors: string[] = [];
  messages: string[] = [];
  loginForm: UntypedFormGroup;
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  listReplyingParty: RelyingPartyDto[] = []

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
    private customService: CustomService,
  ) {
    if (this.authService.isAuthenticated() && localStorage.getItem(DATABASE_ID) && this.cookieService.get(DATABASE_ID)) {
      this.router.navigateByUrl('pages/dashboard');
    }
  }

  async ngOnInit() {
    await this.findAllRelyingParty()
    this.loginForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
      timeoutInSeconds: this.fb.control(0),
      relyingPartyId: this.fb.control(''),
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

    this.authService.generateCustomerAccessToken(data).subscribe(response => {
      if (response.token) {
        this.authService.storeTokens(response)
        if (response.subject) {
          this.router.navigate(['/home'], { replaceUrl: true })
        }
      } else {
        this.messageService.errorByText(response.subject)
      }
    })
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  public async findAllRelyingParty() {
    await this.customService.findAllRelyingParty().toPromise().then(data => {
      data = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      for (const iterator of data) {
        iterator.filter = ''
      }
      this.listReplyingParty = data.filter(f => f.status !== Status.DELETED)
    })
  }

  ngOnDestroy(): void {
  }

}
