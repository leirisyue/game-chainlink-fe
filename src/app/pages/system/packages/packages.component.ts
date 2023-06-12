import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { PackagesFormComponent } from '../../../@form/packages-form/packages-form.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '../../../@core/services/utils/config.service';
import humanizeDuration from 'humanize-duration';

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
    private dialog: MatDialog,
    private location: Location,
    protected router: Router,
    private configService: ConfigService
  ) { }

  async ngOnInit() {
    await this.findAllRelyingParty()

    // this.onClickContextMenu()
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
            packages.typeLicense = humanizeDuration(packages.amount, { largest: 2, language: 'vi', units: ["y", "mo", "d", "h", "m", "s"], round: true });
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
            packages.typeLicense = humanizeDuration(packages.amount, { largest: 2, language: 'vi', units: ["y", "mo", "d", "h", "m", "s"], round: true });
          }
        }
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.dataSource.data = data
      }
    })
  }

  //--------------------------------------------------------------------------------------------------
  openFormPackage(data?: PackageDto) {
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
  // private onClickContextMenu() {
  //   this.sub = this.nbMenuService.onItemClick().subscribe(async (menuBag: any) => {
  //     if (menuBag.item.id === UPDATE) {
  //       this.openFormPackage(menuBag.tag)
  //     } else if (menuBag.item.id === DELETE) {
  //       this.deleteItem(menuBag.tag.id)
  //     } else if (menuBag.item.id === ACTIVE) {
  //       this.activateRelyingPartyPackage(menuBag.tag.id)
  //     }
  //   });
  // }
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

  ngOnDestroy() {
    this.dialog.closeAll()
  }
}
