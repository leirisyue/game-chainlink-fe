import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UserAccountCreateForm, UserAccountDto } from '../../../@core/interfaces/endpoint/users';
import { CREATE, UPDATE } from '../../../@core/interfaces/variable';
import { UsersService } from '../../../@core/services/endpoint/users.service';
import { MessageService } from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  @Input() data: UserAccountDto;
  dataInput: UserAccountCreateForm = new UserAccountCreateForm()
  view = false
  constructor(
    protected ref: NbDialogRef<UsersFormComponent>,
    private usersService: UsersService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data && this.data.id) {
      this.view = true
    }
  }

  async submit(form: UserAccountCreateForm) {
    // this.data?.id ? await this.update(form) : await this.create(form)
    await this.create(form)
    this.close()
  }

  private async create(form: UserAccountCreateForm) {
    await this.usersService.createUserAccount(form).toPromise()
      .then(() => this.messageService.successByType(CREATE))
  }
  //--------------------------------------------------------------------------------------------
  // private async update(form: PackageDto) {
  //   await this.usersService.updateRelyingPartyPackage(form, this.data.id).toPromise()
  //     .then(() => {
  //       this.messageService.successByType(UPDATE),
  //         this.close() 
  //     }
  //     )
  // }
  //--------------------------------------------------------------------------------------------
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
  //--------------------------------------------------------------------------------------------
  close() {
    this.ref.close(this.data);
  }
}
