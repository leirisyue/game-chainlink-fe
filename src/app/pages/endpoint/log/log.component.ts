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
import { EventName, EventType } from '../../../@core/interfaces/enum';
import { EventDto } from '../../../@core/interfaces/system/events';
import { DELETE, VIEW } from '../../../@core/interfaces/variable';
import { EventService } from '../../../@core/services/endpoint/events.service';
import { UsersService } from '../../../@core/services/endpoint/users.service';
import { MessageService } from '../../../@core/utils/message.service';

@Component({
  selector: 'ngx-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  displayedColumns = ['id', 'eventName', 'eventType', 'eventStatus', 'eventDetail', 'timestamp']
  dataSource = new MatTableDataSource<EventDto>()
  selection = new SelectionModel<EventDto>(true, [])
  @ViewChild(MatSort, { static: false }) sort: MatSort
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  items = [
    { title: VIEW, id: VIEW },
    { title: DELETE, id: DELETE },
  ]
  sub: Subscription
  //--------------------------------------------------------------------------------------------------
  to = new Date()
  from = new Date()
  dateToday = new Date()
  listUser: UserAccountDto[]
  userId: string
  filterBy: number
  listEventName = EventName
  listEventType = EventType
  eventNameValue: string
  eventTypeValue: string

  constructor(
    private eventService: EventService,
    private dialogService: NbDialogService,
    public translateService: TranslateService,
    private nbMenuService: NbMenuService,
    private messageService: MessageService,
    protected router: Router,
    private usersService: UsersService
  ) { }

  async ngOnInit() {
    await this.getAllUserAccount()
    await this.findAll()
    for (const iterator of this.items) {
      this.translateService.get('Button.' + iterator.title).subscribe(data => {
        if (!data.includes('Button')) {
          iterator.title = data
        }
      })
    }
  }
  public async findAll() {
    let to, from
    if (this.to) {
      to = new Date(this.to)
      to = new Date(to).toLocaleDateString('fr-CA')
    } else {
      to = null
    }
    if (this.from) {
      from = new Date(this.from)
      from = new Date(from).toLocaleDateString('fr-CA')
    } else {
      from = null
    }
    this.selection.clear()
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    await this.eventService.getLogEvent(from, to).toPromise().then(data => {
      data = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      for (const iterator of data) {
        iterator.filter = ''
      }
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      this.dataSource.data = data
    })
  }
  public async getLogEventByName() {
    let to, from
    if (this.to) {
      to = new Date(this.to)
      to = new Date(to).toLocaleDateString('fr-CA')
    } else {
      to = null
    }
    if (this.from) {
      from = new Date(this.from)
      from = new Date(from).toLocaleDateString('fr-CA')
    } else {
      from = null
    }
    this.selection.clear()
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    if (!this.eventNameValue) {
      return
    }
    await this.eventService.getLogEventByName(this.eventNameValue, from, to).toPromise().then(data => {
      data = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      for (const iterator of data) {
        iterator.filter = ''
      }
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      this.dataSource.data = data
    })
  }
  public async getLogEventByType() {
    let to, from
    if (this.to) {
      to = new Date(this.to)
      to = new Date(to).toLocaleDateString('fr-CA')
    } else {
      to = null
    }
    if (this.from) {
      from = new Date(this.from)
      from = new Date(from).toLocaleDateString('fr-CA')
    } else {
      from = null
    }
    this.selection.clear()
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    if (!this.eventTypeValue) {
      return
    }
    await this.eventService.getLogEventByType(this.eventTypeValue, from, to).toPromise().then(data => {
      data = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      for (const iterator of data) {
        iterator.filter = ''
      }
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      this.dataSource.data = data
    })
  }
  public async getLogEventByUser() {
    let to, from
    if (this.to) {
      to = new Date(this.to)
      to = new Date(to).toLocaleDateString('fr-CA')
    } else {
      to = null
    }
    if (this.from) {
      from = new Date(this.from)
      from = new Date(from).toLocaleDateString('fr-CA')
    } else {
      from = null
    }
    this.selection.clear()
    if (!this.userId) {
      return
    }
    await this.eventService.getLogEventByUser(this.userId, from, to).toPromise().then(data => {
      data = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      for (const iterator of data) {
        iterator.filter = ''
      }
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      this.dataSource.data = data
    })
  }

  async getAllUserAccount() {
    await this.usersService.getAllUserAccount().toPromise().then(data => {
      data = data.sort((a, b) => a.displayName.localeCompare(b.displayName))
      this.listUser = data
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
  checkboxLabel(row?: EventDto): string {
    if (!row) { return `${this.isAllSelected() ? 'select' : 'deselect'} all`; }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase()
  }
  //-------------------------------------------------------------------------------------------------- 
  changeOptionFilter() {
    this.to = new Date()
    this.from = new Date()
  }

  filterDataTable() {
    switch (this.filterBy) {
      case 0:
        this.findAll()
        break;
      case 1:
        this.getLogEventByName()
        break;
      case 2:
        this.getLogEventByType()
        break;
      case 3:
        this.getLogEventByUser()
        break;
      default:
        break;
    }
  }
}
