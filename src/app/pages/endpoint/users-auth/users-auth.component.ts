import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbMenuService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthenticatorDto } from '../../../@core/interfaces/authenticators';
import { UserAccountDto } from '../../../@core/interfaces/endpoint/users';
import { DELETE, UPDATE, VIEWDETAIL } from '../../../@core/interfaces/variable';
import { UsersService } from '../../../@core/services/endpoint/users.service';
import { MessageService } from '../../../@core/utils/message.service';
import { UsersAuthFormComponent } from '../users-auth-form/users-auth-form.component';

@Component({
  selector: 'ngx-users-auth',
  templateUrl: './users-auth.component.html',
  styleUrls: ['./users-auth.component.scss']
})
export class UsersAuthComponent implements OnInit {

  paramId: string = null
  data: AuthenticatorDto[]
  //--------------------------------------------------------------------------------------------------
  displayedColumns = ['id', 'name', 'counter', 'createdDate', 'lastAccess', 'option']
  dataSource = new MatTableDataSource<AuthenticatorDto>()
  selection = new SelectionModel<AuthenticatorDto>(true, [])
  @ViewChild(MatSort, { static: false }) sort: MatSort
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  items = [
    { title: VIEWDETAIL, id: VIEWDETAIL },
    { title: DELETE, id: DELETE },
  ]
  //--------------------------------------------------------------------------------------------------
  sub: Subscription
  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService,
    public translateService: TranslateService,
    private nbMenuService: NbMenuService,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      this.paramId = params['id']
    })
    if (this.paramId) {
      this.getAllUserAuthenticator()
    }
    for (const iterator of this.items) {
      this.translateService.get('Button.' + iterator.title).subscribe(data => {
        if (!data.includes('Button')) {
          iterator.title = data
        }
      })
    }
    this.onClickContextMenu()
  }

  async getAllUserAuthenticator() {
    await this.usersService.getAllUserAuthenticator(this.paramId).toPromise().then(data => {

      data = data.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      this.data = data
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

  checkboxLabel(row?: AuthenticatorDto): string {
    if (!row) { return `${this.isAllSelected() ? 'select' : 'deselect'} all`; }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase()
  }
  //--------------------------------------------------------------------------------------------------
  private onClickContextMenu() {
    this.sub = this.nbMenuService.onItemClick().subscribe((menuBag: any) => {
      console.log("Record Id: ", menuBag.tag);
      if (menuBag.item.id === VIEWDETAIL) {
        this.openForm(menuBag.tag)
      } else if (menuBag.item.id === DELETE) {
        this.deleteUserAccount(menuBag.tag.id)
      }
    });
  }
  //--------------------------------------------------------------------------------------------------
  openForm(data?: AuthenticatorDto) {
    data.UserId = this.paramId
    const dialogRef = this.dialogService.open(UsersAuthFormComponent, {
      context: { data: data || new AuthenticatorDto() },
      closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(() => this.getAllUserAuthenticator());
  }

  async deleteUserAccount(id: string) {
    await this.usersService.deleteUserAccount(id).toPromise().then(() => {
      this.messageService.successByType(DELETE)
    })
  }
  //--------------------------------------------------------------------------------------------------
  close() {
    this.router.navigateByUrl(`pages/endpoint/users`);
  }
}
