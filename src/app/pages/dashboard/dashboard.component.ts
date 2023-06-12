import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService } from '@nebular/theme';
import { AuthService } from '../../@auth/auth.service';
import { PackageType, Role } from '../../@core/interfaces/enum';
import { ServicePackageDto, SystemUsageDto } from '../../@core/interfaces/system/package';
import { RelyingPartyDto } from '../../@core/interfaces/system/relying-party';
import { InfoService } from '../../@core/services/endpoint/info.service';
import { PackageService } from '../../@core/services/system/package.service';
import { ConfigService } from '../../@core/services/utils/config.service';
import { InfoFormComponent } from './info-form/info-form.component';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  role = Role
  relyingParty: RelyingPartyDto
  listPort: string
  listSub: string
  //---------------------------------------------------------------------------------
  systemUsageDto: SystemUsageDto = new SystemUsageDto()
  //---------------------------------------------------------------------------------
  servicePackageDto: ServicePackageDto
  displayedColumns = ['id', 'amount', 'type', 'createdDate', 'activatedDate', 'description']
  dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  @ViewChild(MatSort, { static: false }) sort: MatSort
  //---------------------------------------------------------------------------------
  showPassword = false;
  constructor(
    public authService: AuthService,
    public infoService: InfoService,
    private dialogService: NbDialogService,
    private packageService: PackageService,
    private configService: ConfigService
  ) { }

  async ngOnInit() {
    if (this.authService.subject !== Role.SYSTEM) {
      await this.getInfo()
      await this.getServiceLicense()
    } else {
      await this.getSystemUsage()
    }
  }
  //--------------------------------endpoint------------------------------------------
  async getInfo() {
    await this.infoService.getInfo().toPromise().then(data => {
      this.relyingParty = data
      if (data.ports.length > 0) {
        this.listPort = ''
        this.listPort = data.ports.join(', ')
      }
      if (data.subdomains.length > 0) {
        this.listSub = ''
        this.listSub = data.subdomains.join(', ')
      }
    })
  }
  async getServiceLicense() {
    await this.infoService.getServiceLicense().toPromise().then(data => {
      if (data) {
        data.packages = data.packages.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
        for (const packages of data.packages) {
          if (packages.type === PackageType.TIME) {
            packages.typeLicense = this.configService.changeAmountMillisecond(packages.amount)
            packages.amount = this.configService.changeAmountTimePlus(packages.amount, packages.typeLicense)
          }
        }
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.dataSource.data = data.packages
        this.servicePackageDto = data

      }
    })
  }
  //----------------------------------system-----------------------------------------
  async getSystemUsage() {
    await this.packageService.getSystemUsage().toPromise().then(data => {
      this.systemUsageDto = data
    })
  }
  //---------------------------------------------------------------------------------
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  //---------------------------------------------------------------------------------
  openForm() {
    let data = this.relyingParty
    const dialogRef = this.dialogService.open(InfoFormComponent, {
      context: { data: data || new RelyingPartyDto() },
      closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(() => this.getInfo());
  }
}
