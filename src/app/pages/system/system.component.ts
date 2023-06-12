import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '../../@core/utils/i18n.service';

@Component({
  selector: 'ngx-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    public i18nService: I18nService,
  ) {
    if (!this.i18nService.getLocaleLanguage()) {
      this.i18nService.changeLanguage(this.i18nService.language);
    } else {
      this.i18nService.language = this.i18nService.getLocaleLanguage();
      this.translateService.use(this.i18nService.language);
    }
  }

  ngOnInit(): void {
  }

}
