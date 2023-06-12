import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from '../../../@core/interfaces/enum';
import { RelyingPartyDto } from '../../../@core/interfaces/system/relying-party';
import { RelyingPartyService } from '../../../@core/services/system/relying-party.service';
import { ReplyingPartyFormComponent } from '../replying-party-form/replying-party-form.component';

import { NbDialogService, NbMenuService } from '@nebular/theme';
import { ACTIVE, DELETE, INACTIVE, VIEW, VIEWDETAIL } from '../../../@core/interfaces/variable';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../@core/utils/message.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngx-relying-party',
  templateUrl: './relying-party.component.html',
  styleUrls: ['./relying-party.component.scss']
})
export class RelyingPartyComponent implements OnInit {

  displayedColumns = ['id', 'name', 'origin', 'description', 'createdDate', 'status', 'option']
  dataSource = new MatTableDataSource<RelyingPartyDto>()
  selection = new SelectionModel<RelyingPartyDto>(true, [])
  @ViewChild(MatSort, { static: false }) sort: MatSort
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  //-----------------------------------------------------------------------------

  sub: Subscription
  constructor(
    private relyingPartyService: RelyingPartyService,
    private dialogService: NbDialogService,
    public translateService: TranslateService,
    private nbMenuService: NbMenuService,
    private messageService: MessageService,
  ) { }
  async ngOnInit() {
    await this.findAll()
    // this.onClickContextMENU()
  }
  public async findAll() {
    this.selection.clear()
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    await this.relyingPartyService.findAllRelyingParty().toPromise().then(data => {
      data = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      for (const iterator of data) {
        iterator.filter = ''
      }
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      this.dataSource.data = data.filter(f => f.status !== Status.DELETED)
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

  checkboxLabel(row?: RelyingPartyDto): string {
    if (!row) { return `${this.isAllSelected() ? 'select' : 'deselect'} all`; }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase()
  }
  //--------------------------------------------------------------------------------------------------
  // private onClickContextMENU() {
  //   this.sub = this.nbMenuService.onItemClick().subscribe((menuBag: any) => {
  //     if (menuBag.item.id === ACTIVE) {
  //       this.updateRelyingPartyStatusActive(menuBag.tag.id)
  //     } else if (menuBag.item.id === INACTIVE) {
  //       this.updateRelyingPartyStatusInactive(menuBag.tag.id)
  //     } else if (menuBag.item.id === DELETE) {
  //       this.deleteRelyingParty(menuBag.tag.id)
  //     } else if (menuBag.item.id === VIEWDETAIL) {
  //       this.openFormRelying(menuBag.tag)
  //     }
  //   });
  // }
  //--------------------------------------------------------------------------------------------------
  openFormRelying(data?: RelyingPartyDto, view?: boolean) {
    if (!data) {
      view = false
    }
    const dialogRef = this.dialogService.open(ReplyingPartyFormComponent, {
      context: { data: data || new RelyingPartyDto(), view: view },
      closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(() => {
      this.findAll()
    });
  }
  async updateRelyingPartyStatusActive(id: string) {
    const isYes = await this.messageService.getSwal('Bạn có muốn kích hoạt khách hàng này?')
    if (isYes) {
      await this.relyingPartyService.updateRelyingPartyStatusActive(id).toPromise().then(() => {
        this.messageService.successByType(ACTIVE)
        this.findAll()
      })
    }
  }
  async updateRelyingPartyStatusInactive(id: string) {
    const isYes = await this.messageService.getSwal('Bạn có muốn vô hiệu hóa khách hàng này?')
    if (isYes) {
      await this.relyingPartyService.updateRelyingPartyStatusInactive(id).toPromise().then(() => {
        this.messageService.successByType(INACTIVE)
        this.findAll()
      })
    }
  }
  async deleteRelyingParty(id: string) {
    const isYes = await this.messageService.getSwal('Bạn có muốn xóa khách hàng này?')
    if (isYes) {
      await this.relyingPartyService.deleteRelyingParty(id).toPromise().then(() => {
        this.messageService.successByType(DELETE)
        this.findAll()
      })
    }
  }

  ngOnDestroy() {
  }
}
