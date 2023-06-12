import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { RelyingPartyDto, RelyingPartyUpdateForm } from '../../../@core/interfaces/system/relying-party';
import { UPDATE } from '../../../@core/interfaces/variable';
import { InfoService } from '../../../@core/services/endpoint/info.service';
import { MessageService } from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss']
})
export class InfoFormComponent implements OnInit {

  @Input() data: RelyingPartyDto;
  listSub: string
  listPort: string
  input: RelyingPartyUpdateForm = new RelyingPartyUpdateForm()

  constructor(
    protected ref: NbDialogRef<InfoFormComponent>,
    private infoService: InfoService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    if (this.data.ports.length > 0) {
      this.listPort = ''
      this.listPort = this.data.ports.join(', ')
    }
    if (this.data.subdomains.length > 0) {
      this.listSub = ''
      this.listSub = this.data.subdomains.join(', ')
    }
  }

  async submit() {
    await this.update()
    this.close()
  }

  async update() {
    let isError = false
    this.input.name = this.data.name
    this.input.description = this.data.description

    if (this.listPort) {
      let ports = this.listPort?.toString().split(',').map(function (item) {
        return item.trim();
      });
      this.input.ports = ports.map(Number)
    } else {
      this.input.ports = []
    }

    if (this.listSub) {
      this.input.subdomains = this.listSub?.split(',').map(function (item) {
        return item.trim();
      });
    } else {
      this.input.subdomains = []
    }

    await this.infoService.updateInfo(this.input).toPromise().then().catch(() => isError = true)
    if (!isError) {
      if (!isError) {
        this.messageService.successByType(UPDATE)
        this.close()
      }
    }
  }

  close() {
    this.ref.close(this.data);
  }

}
