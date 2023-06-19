import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Status } from '../../../@core/interfaces/enum';
import { RelyingPartyDto, RelyingPartyUpdateForm } from '../../../@core/interfaces/system/relying-party';
import { CREATE, INACTIVE, UPDATE } from '../../../@core/interfaces/variable';
import { RelyingPartyService } from '../../../@core/services/system/relying-party.service';
import { ConfigService } from '../../../@core/services/utils/config.service';
import { MessageService } from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-replying-party-form',
  templateUrl: './replying-party-form.component.html',
  styleUrls: ['./replying-party-form.component.scss']
})
export class ReplyingPartyFormComponent implements OnInit {

  @Input() data: RelyingPartyDto;
  @Input() input: RelyingPartyUpdateForm = new RelyingPartyUpdateForm();
  @Input() view: boolean
  listPort: string
  listSub: string

  showPassword = false;

  constructor(
    protected ref: NbDialogRef<ReplyingPartyFormComponent>,
    private relyingPartyService: RelyingPartyService,
    private messageService: MessageService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.input.name = this.data.name
      this.input.origin = this.data.origin
      this.input.description = this.data.description
      this.input.email = this.data.email
      this.input.phone = this.data.phone

      if (this.data.ports?.length > 0) {
        this.listPort = ''
        this.listPort = this.data.ports.join(', ')
      }
    }
  }

  async submit(form: RelyingPartyUpdateForm) {
    this.data?.id ? await this.update(form) : await this.create(form)
  }

  private async create(form: RelyingPartyUpdateForm) {
    await this.relyingPartyService.createRelyingParty(form).toPromise()
      .then(res => {
        this.data = res
        this.messageService.successByType(CREATE)
        this.close()
      })
  }
  private async update(form: RelyingPartyUpdateForm) {
    form.name = this.data.name
    form.origin = this.data.origin
    form.description = this.data.description
    await this.relyingPartyService.updateRelyingParty(form, this.data.id).toPromise()
      .then(async res => {
        this.messageService.successByType(UPDATE)
        this.close()
      })
  }

  //---------------------------------------------------------------------------------
  getInputType(text: any) {
    if (this.showPassword) {
      return text;
    }
    return "********************************";
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  //---------------------------------------------------------------------------------

  close() {
    this.ref.close(this.data);
  }


  ngOnDestroy() {
    this.close()
  }
}
