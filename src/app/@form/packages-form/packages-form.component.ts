import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme'; import { PackageType, Status } from '../../@core/interfaces/enum';
import { PackageDto } from '../../@core/interfaces/system/package';
import { RelyingPartyDto } from '../../@core/interfaces/system/relying-party';
import { CREATE, UPDATE } from '../../@core/interfaces/variable';
import { PackageService } from '../../@core/services/system/package.service';
import { RelyingPartyService } from '../../@core/services/system/relying-party.service';
import { MessageService } from '../../@core/utils/message.service';


@Component({
  selector: 'ngx-packages-form',
  templateUrl: './packages-form.component.html'
})
export class PackagesFormComponent implements OnInit {

  @Input() data: PackageDto;
  //-------------------------------------------------------------------------------------------------
  listReplyingParty: RelyingPartyDto[] = []
  idReplyingParty: string
  packageType = PackageType
  //-------------------------------------------------------------------------------------------------
  constructor(
    protected ref: NbDialogRef<PackagesFormComponent>,
    private relyingPartyService: RelyingPartyService,
    private messageService: MessageService,
    private packageService: PackageService
  ) { }

  async ngOnInit() {
    await this.findAllRelyingParty()
  }

  async submit(form: PackageDto) {
    this.data?.id ? await this.update(form) : await this.create(form)
    this.close()
  }

  private async create(form: PackageDto) {
    if (form.type === PackageType.TIME) {
      let timePlus = this.changeAmountMillisecond(form.typeLicense)
      form.amount = form.amount * timePlus
    }
    await this.packageService.createRelyingPartyPackage(form).toPromise()
      .then(() => {
        this.messageService.successByType(CREATE)
        this.close()
      })
  }

  private async update(form: PackageDto) {
    if (form.type === PackageType.TIME) {
      let timePlus = this.changeAmountMillisecond(form.typeLicense)
      form.amount = form.amount * timePlus
    }
    await this.packageService.updateRelyingPartyPackage(form, this.data.id).toPromise()
      .then(() => {
        this.messageService.successByType(UPDATE)
        this.close()
      })
  }

  changeAmountMillisecond(typeLicense: string) {
    let timePlus = 0
    switch (typeLicense) {
      case 'second':
        timePlus = 1000
        break;
      case 'minutes':
        timePlus = 60 * 1000
        break;
      case 'hour':
        timePlus = 60 * 60 * 1000
        break;
      case 'date':
        timePlus = 24 * 60 * 60 * 1000
        break;
      default:
        timePlus = 1
        break;
    }
    return timePlus
  }

  public async findAllRelyingParty() {
    await this.relyingPartyService.findAllRelyingParty().toPromise().then(data => {
      data = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      for (const iterator of data) {
        iterator.filter = ''
      }
      this.listReplyingParty = data.filter(f => f.status !== Status.INACTIVE)
    })
  }

  close() {
    this.ref.close(this.data);
  }
}