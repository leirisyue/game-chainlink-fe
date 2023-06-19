import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NB_AUTH_OPTIONS } from '@nebular/auth';
import { CustomCreateForm } from '../../../@core/interfaces/system/customer';
import { CREATE } from '../../../@core/interfaces/variable';
import { MessageService } from '../../../@core/utils/message.service';
import { AuthService } from '../../auth.service';
import { getDeepFromObject } from '../../helpers';
import { CustomService } from '../../../@core/services/custom.service';
import { RelyingPartyDto } from '../../../@core/interfaces/system/relying-party';
import { Status } from '../../../@core/interfaces/enum';

@Component({
   selector: 'ngx-register',
   templateUrl: './register.component.html',
})
export class NgxRegisterComponent implements OnInit {
   view = false
   data: CustomCreateForm = new CustomCreateForm()

   listReplyingParty: RelyingPartyDto[] = []
   constructor(
      private customService: CustomService,
      private messageService: MessageService,
      private router: Router,
   ) { }

   ngOnInit(): void {
      this.findAllRelyingParty()
   }

   async submit(form: CustomCreateForm) {
      // this.data?.id ? await this.update(form) : await this.create(form)
      await this.create(form)
   }
   public findAllRelyingParty() {
      this.customService.findAllRelyingParty().toPromise().then(data => {
         data = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
         for (const iterator of data) {
            iterator.filter = ''
         }
         this.listReplyingParty = data.filter(f => f.status !== Status.DELETED)
      })
   }
   private async create(form: CustomCreateForm) {
      form.remember = true
      form.timeoutInSeconds = 0
      await this.customService.createCustomAccount(form).toPromise()
         .then(() => {
            this.messageService.successByType(CREATE)
            this.router.navigateByUrl('/auth/login')
         })

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
}