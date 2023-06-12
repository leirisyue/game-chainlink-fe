import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../@core/services/utils/config.service';

@Component({
  selector: 'ngx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],

})
export class BreadcrumbComponent implements OnInit {

  constructor(
    public configService: ConfigService,
    public translate: TranslateService
  ) {
    configService.breadcrumb.title1 = null;
    configService.breadcrumb.title2 = null;
    configService.breadcrumb.title3 = null;
    configService.breadcrumb.title4 = null;
  }

  ngOnInit(): void {
  }

}
