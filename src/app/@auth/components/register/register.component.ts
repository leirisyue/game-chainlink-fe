
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html'
})
export class NgxRegisterComponent implements OnInit {

  _tab = 0
  isBusiness
  isUser
  constructor() { }

  ngOnInit() {
    this.isBusiness = true
  }
  changeTab(event) {
    this._tab = event.tabId
    if (event.tabId === 0) {
      this.isBusiness = true
      this.isUser = false
    } else {
      this.isBusiness = false
      this.isUser = true
    }
    // this.excelService.writeExcel(this.dataSource.data, MenuType.CASH_VOUCHER)
  }
}
