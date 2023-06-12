import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { AuthenticatorDto, UserAuthenticatorUpdateForm } from '../../../@core/interfaces/authenticators';
import { UPDATE } from '../../../@core/interfaces/variable';
import { UsersService } from '../../../@core/services/endpoint/users.service';
import { MessageService } from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-users-auth-form',
  templateUrl: './users-auth-form.component.html',
  styleUrls: ['./users-auth-form.component.scss']
})
export class UsersAuthFormComponent implements OnInit {

  @Input() data: AuthenticatorDto
  paramIdUser: string = null
  constructor(
    protected ref: NbDialogRef<UsersAuthFormComponent>,
    private usersService: UsersService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { }

  async submit(form: AuthenticatorDto) {
    // this.data?.id ? await this.update(form) : await this.create(form)
    await this.update()
    this.close()
  }

  private async update() {
    let userAuthenticator = new UserAuthenticatorUpdateForm()
    userAuthenticator.name = this.data.name
    await this.usersService.updateUserAuthenticator(userAuthenticator, this.data.UserId, this.data.id).toPromise()
      .then(() => this.messageService.successByType(UPDATE))
  }

  close() {
    this.ref.close(this.data);
  }
}
