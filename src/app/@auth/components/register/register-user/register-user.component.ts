import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { CREATE } from '../../../../@core/interfaces/variable';
import { isNumberKey, isTaxCode } from '../../../../@core/utils/helpers';
import { MessageService } from '../../../../@core/utils/message.service';
import { AuthService } from '../../../auth.service';
import { EMAIL_PATTERN } from '../../constants';


@Component({
  selector: 'ngx-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  user: any = {};

  registerUserForm: UntypedFormGroup;
  constructor(protected authService: AuthService,
    protected cd: ChangeDetectorRef,
    private fb: UntypedFormBuilder,
    protected router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService,
  ) { }

  get userFullName() { return this.registerUserForm.get('userFullName'); }
  get email() { return this.registerUserForm.get('userEmail'); }
  get businessID() { return this.registerUserForm.get('businessID'); }

  ngOnInit() {
    const loginValidators = [
      Validators.minLength(4),
      Validators.maxLength(32),
      Validators.required
    ];
    const emailValidators = [
      Validators.pattern(EMAIL_PATTERN),
      Validators.required
    ];
    this.registerUserForm = this.fb.group({
      userFullName: this.fb.control('', [Validators.maxLength(32), Validators.required]),
      userEmail: this.fb.control('', [Validators.pattern(EMAIL_PATTERN), Validators.required]),
      businessID: this.fb.control('', [Validators.required, Validators.maxLength(200)]),
    });
  }

  async register() {
    // let isError = true
    // let data: RegisterEmployeeForm = new RegisterEmployeeForm()
    // data.userFullName = this.registerUserForm.value?.userFullName
    // data.userEmail = this.registerUserForm.value?.userEmail
    // data.companyInviteCode = this.registerUserForm.value?.businessID
    // await this.registerService.registerEmployee(data).toPromise().then(async () => {
    //   await this.messageService.successByType(CREATE)
    //   isError = false
    // })
    // if (!isError) {
    //   let isYes = await this.messageService.getSwalOK(`Tài khoản đăng ký thành công. <br\> Vui lòng kiểm tra email đã đăng ký!`)
    //   if (isYes) {
    //     return this.router.navigateByUrl('auth/login');
    //   }
    // }
  }
}
