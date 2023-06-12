import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService, NbMenuService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PackageType, Status } from '../../../@core/interfaces/enum';
import { PackageDto, ServicePackageDto } from '../../../@core/interfaces/system/package';
import { RelyingPartyDto } from '../../../@core/interfaces/system/relying-party';
import { UPDATE, DELETE, ACTIVE } from '../../../@core/interfaces/variable';
import { PackageService } from '../../../@core/services/system/package.service';
import { RelyingPartyService } from '../../../@core/services/system/relying-party.service';
import { MessageService } from '../../../@core/utils/message.service';
import { PackagesFormComponent } from '../packages-form/packages-form.component';

@Component({
  selector: 'ngx-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  displayedColumns = ['id', 'amount', 'type', 'createdDate', 'activatedDate', 'description', 'option']
  dataSource = new MatTableDataSource<any>()
  selection = new SelectionModel<any>(true, [])
  @ViewChild(MatSort, { static: false }) sort: MatSort
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  items = [
    { title: ACTIVE, id: ACTIVE },
    { title: UPDATE, id: UPDATE },
    { title: DELETE, id: DELETE },
  ]
  sub: Subscription
  //-------------------------------------------------------------------------------------------------
  listReplyingParty: RelyingPartyDto[] = []
  idReplyingParty: string
  servicePackageDto: ServicePackageDto
  //-------------------------------------------------------------------------------------------------
  packageType = PackageType
  constructor(
    private relyingPartyService: RelyingPartyService,
    private packageService: PackageService,
    private dialogService: NbDialogService,
    public translateService: TranslateService,
    private nbMenuService: NbMenuService,
    private messageService: MessageService,
  ) { }

  async ngOnInit() {
    await this.findAllRelyingParty()
    for (const iterator of this.items) {
      this.translateService.get('Button.' + iterator.title).subscribe(data => {
        if (!data.includes('Button')) {
          iterator.title = data
        }
      })
    }
    this.onClickContextMenu()
  }

  public async findAllRelyingParty() {
    await this.relyingPartyService.findAllRelyingParty().toPromise().then(data => {
      data = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      for (const iterator of data) {
        iterator.filter = ''
      }
      this.listReplyingParty = data.filter(f => f.status !== Status.DELETED)
    })
  }
  //--------------------------------------------------------------------------------------------------
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row): string {
    if (!row) { return `${this.isAllSelected() ? 'select' : 'deselect'} all`; }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase()
  }
  //--------------------------------------------------------------------------------------------------
  async changeReplyingParty(idReplying: string) {
    this.selection.clear()
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    await this.packageService.getRelyingPartyServiceLicense(idReplying).toPromise().then(data => {
      if (data) {
        for (const packages of data.packages) {
          if (packages.type === PackageType.TIME) {
            packages.typeLicense = this.changeAmountMillisecond(packages.amount)
            packages.amount = this.changeAmountTimePlus(packages.amount, packages.typeLicense)
          }
        }
        this.servicePackageDto = data
      }
      this.getRelyingPartyServicePackage(idReplying)
    })
  }

  async getRelyingPartyServicePackage(idReplying: string) {
    await this.packageService.getRelyingPartyServicePackage(idReplying).toPromise().then(data => {
      if (data) {
        data = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
        for (const packages of data) {
          if (packages.type === PackageType.TIME) {
            packages.typeLicense = this.changeAmountMillisecond(packages.amount)
            packages.amount = this.changeAmountTimePlus(packages.amount, packages.typeLicense)
          }
        }
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.dataSource.data = data
      }
    })
  }


  changeAmountMillisecond(amount: number) {
    let timezone = ''
    if (amount % 86400000 === 0) {
      timezone = 'date'
    } else if (amount % 3600000 === 0) {
      timezone = 'hour'
    } else if (amount % 60000 === 0) {
      timezone = 'minutes'
    } else if (amount % 1000 === 0) {
      timezone = 'second'
    }
    return timezone
  }
  changeAmountTimePlus(amount: number, timezone: string) {
    let timePlus = 0
    switch (timezone) {
      case 'second':
        timePlus = amount / 1000
        break;
      case 'minutes':
        timePlus = amount / (60 * 1000)
        break;
      case 'hour':
        timePlus = amount / (60 * 60 * 1000)
        break;
      case 'date':
        timePlus = amount / (24 * 60 * 60 * 1000)
        break;
      default:
        timePlus = 1
        break;
    }
    return timePlus
  }
  //--------------------------------------------------------------------------------------------------
  openForm(data?: PackageDto) {
    const dialogRef = this.dialogService.open(PackagesFormComponent, {
      context: { data: data || new PackageDto() },
      closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(() => {
      if (this.idReplyingParty) {
        this.changeReplyingParty(this.idReplyingParty)
      }
    });
  }
  //--------------------------------------------------------------------------------------------------
  private onClickContextMenu() {
    this.sub = this.nbMenuService.onItemClick().subscribe(async (menuBag: any) => {
      if (menuBag.item.id === UPDATE) {
        this.openForm(menuBag.tag)
      } else if (menuBag.item.id === DELETE) {
        this.deleteItem(menuBag.tag.id)
      } else if (menuBag.item.id === ACTIVE) {
        this.activateRelyingPartyPackage(menuBag.tag.id)
      }
    });
  }
  async deleteItem(id: string) {
    let isError = false
    const isYes = await this.messageService.getSwal('Bạn có muốn xóa gói dịch vụ này?')
    if (isYes) {
      await this.packageService.deleteRelyingPartyPackage(id).toPromise().then().catch(() => isError = true)
      if (!isError) {
        this.messageService.successByType(DELETE)
        if (this.idReplyingParty) {
          this.changeReplyingParty(this.idReplyingParty)
        }
      }
    }
  }
  //--------------------------------------------------------------------------------------------------  
  public async activateRelyingPartyPackage(id: string) {
    let isError = false
    const isYes = await this.messageService.getSwal('Bạn có muốn kích hoạt gói dịch vụ này?')
    if (isYes) {
      await this.packageService.activateRelyingPartyPackage(id).toPromise().then().catch(() => isError = true)
      if (!isError) {
        if (!isError) {
          this.messageService.successByType(ACTIVE)
          if (this.idReplyingParty) {
            this.changeReplyingParty(this.idReplyingParty)
          }
        }
      }
    }
  }
}
