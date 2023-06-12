import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { isNumberKey, isTaxCode } from '../../../../@core/utils/helpers';
import { MessageService } from '../../../../@core/utils/message.service';
import { AuthService } from '../../../auth.service';
import { EMAIL_PATTERN } from '../../constants';


@Component({
  selector: 'ngx-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterBusinessComponent implements OnInit {


  user: any = {};

  registerForm: UntypedFormGroup;
  constructor(protected authService: AuthService,
    protected cd: ChangeDetectorRef,
    private fb: UntypedFormBuilder,
    protected router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService
  ) { }

  get company() { return this.registerForm.get('companyName'); }
  get taxCode() { return this.registerForm.get('companyTaxCode'); }
  get fullName() { return this.registerForm.get('userFullName'); }
  get email() { return this.registerForm.get('userEmail'); }
  get companyAddress() { return this.registerForm.get('companyAddress'); }
  get representative() { return this.registerForm.get('representative'); }
  get companyPhone() { return this.registerForm.get('companyPhone'); }

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

    this.registerForm = this.fb.group({
      companyAddress: this.fb.control('', [Validators.required, Validators.maxLength(200)]),
      representative: this.fb.control('', [Validators.required, Validators.maxLength(100)]),
      companyName: this.fb.control('', [Validators.required, Validators.maxLength(200)]),
      companyTaxCode: this.fb.control('', [Validators.required, Validators.maxLength(14), Validators.minLength(10)]),
      companyPhone: this.fb.control('', [Validators.required, Validators.maxLength(20), Validators.minLength(10)]),
      userFullName: this.fb.control('', [Validators.maxLength(32), Validators.required]),
      userEmail: this.fb.control('', [Validators.pattern(EMAIL_PATTERN), Validators.required]),
    });
  }

  async register() {
    this.spinner.show()
    this.user = this.registerForm.value;

    // await lastValueFrom(this.authService.register(this.registerForm.value))
    //   .then(async () => {
    //     this.spinner.hide()
    //     const text = await this.translateService.get('Message.Register', { 0: this.registerForm.value.userEmail }).toPromise()
    //     await this.messageService.successByText(text)
    //     return this.router.navigateByUrl('auth/login');
    //   });
  }

  isNumberKey(keyCode, ctrlKey, altKey, shiftKey) {
    return isNumberKey(keyCode, ctrlKey, altKey, shiftKey)
  }

  isTaxCode(keyCode, ctrlKey, altKey, shiftKey) {
    return isTaxCode(keyCode, ctrlKey, altKey, shiftKey)
  }

}
