import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NbDialogService, NbMenuService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserAccountDto } from '../../../@core/interfaces/endpoint/users';
import { Status } from '../../../@core/interfaces/enum';
import { DELETE, UPDATE, VIEW } from '../../../@core/interfaces/variable';
import { UsersService } from '../../../@core/services/endpoint/users.service';
import { MessageService } from '../../../@core/utils/message.service';
import { UsersFormComponent } from '../users-form/users-form.component';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns = ['id', 'userLogin', 'userEmail', 'displayName', 'createdDate', 'option']
  dataSource = new MatTableDataSource<UserAccountDto>()
  selection = new SelectionModel<UserAccountDto>(true, [])
  @ViewChild(MatSort, { static: false }) sort: MatSort
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  items = [
    { title: VIEW, id: VIEW },
    { title: DELETE, id: DELETE },
  ]
  sub: Subscription
  constructor(
    private usersService: UsersService,
    private dialogService: NbDialogService,
    public translateService: TranslateService,
    private nbMenuService: NbMenuService,
    private messageService: MessageService,
    protected router: Router,
  ) { }

  async ngOnInit() {
    await this.findAll()
    for (const iterator of this.items) {
      this.translateService.get('Button.' + iterator.title).subscribe(data => {
        if (!data.includes('Button')) {
          iterator.title = data
        }
      })
    }
    this.onClickContextMenu()
  }
  public async findAll() {
    this.selection.clear()
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    await this.usersService.getAllUserAccount().toPromise().then(data => {
      data = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      for (const iterator of data) {
        iterator.filter = ''
      }
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      this.dataSource.data = data
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
  checkboxLabel(row?: UserAccountDto): string {
    if (!row) { return `${this.isAllSelected() ? 'select' : 'deselect'} all`; }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase()
  }
  //--------------------------------------------------------------------------------------------------
  private onClickContextMenu() {
    this.sub = this.nbMenuService.onItemClick().subscribe((menuBag: any) => {
      console.log("Record Id: ", menuBag.tag, menuBag.item);
      if (menuBag.item.id === UPDATE) {
        this.openForm(menuBag.tag.id)
      } else if (menuBag.item.id === DELETE) {
        this.deleteUserAccount(menuBag.tag.id)
      } else if (menuBag.item.id === VIEW) {
        this.router.navigateByUrl(`pages/endpoint/users-authenticators/${menuBag.tag.id}`);
      }
    });
  }
  //--------------------------------------------------------------------------------------------------
  openForm(data?: UserAccountDto) {
    const dialogRef = this.dialogService.open(UsersFormComponent, {
      context: { data: data || new UserAccountDto() },
      closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(() => this.findAll());
  }
  async deleteUserAccount(id: string) {
    await this.usersService.deleteUserAccount(id).toPromise().then(() => {
      this.messageService.successByType(DELETE)
    })
  }
}