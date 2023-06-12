import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Status } from '../../../@core/interfaces/enum';
import { RelyingPartyDto } from '../../../@core/interfaces/system/relying-party';
import { CREATE, INACTIVE } from '../../../@core/interfaces/variable';
import { RelyingPartyService } from '../../../@core/services/system/relying-party.service';
import { MessageService } from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-replying-party-form',
  templateUrl: './replying-party-form.component.html',
  styleUrls: ['./replying-party-form.component.scss']
})
export class ReplyingPartyFormComponent implements OnInit {

  @Input() data: RelyingPartyDto;
  view = false
  constructor(
    protected ref: NbDialogRef<ReplyingPartyFormComponent>,
    private relyingPartyService: RelyingPartyService,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.view = true
    }
  }

  async submit(form: RelyingPartyDto) {
    this.data?.id ? '' : await this.create(form)
    this.close()
  }

  private async create(form: RelyingPartyDto) {
    form.status = Status.INACTIVE
    await this.relyingPartyService.createRelyingParty(form).toPromise()
      .then(res => {
        this.data = res
        this.messageService.successByType(CREATE)
      })
  }
  // private async update(form: RelyingPartyDto) {
  //   form.status = this.data.status
  //   form.holderName = form.holderName.toUpperCase()
  //   form.bankId = this.banks.find(f => f.name === form.bankName).id
  //   await this.accountBankService.update(this.data.id, form).toPromise()
  //     .then(async res => {
  //       // this.messageService.successByType(UPDATE)
  //       await this.createBankBalance(res.id, form.amount)
  //     })
  // }

  close() {
    this.ref.close(this.data);
  }

}
