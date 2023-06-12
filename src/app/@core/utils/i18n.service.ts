import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalKey } from '../interfaces/enum';
import { PROJECT_NAME } from '../interfaces/variable';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  language = 'vi'

  constructor(
    private titlePageService: Title,
    public translateService: TranslateService,
    private cookieService: CookieService,
  ) { }

  useTranslate() {
    console.log('useTranslate')
    this.translateService.use(this.language);
  }

  localeLanguage() {
    if (!this.getLocaleLanguage()) {
      this.changeLanguage(this.language)
    } else {
      this.language = this.getLocaleLanguage()
      this.translateService.use(this.language)
    }
  }

  getTitlePage() {
    const title = this.titlePageService.getTitle()
    const index = title.indexOf('-')
    const text = title.slice(index + 1)
    return text
  }

  translateTitlePage(type: string) {
    type ?
      this.translateService.get(`Menu.${type}`)
        .subscribe(title => this.titlePageService.setTitle(PROJECT_NAME + '-' + title)) :
      this.titlePageService.setTitle(PROJECT_NAME)
    // console.log(type)
  }

  changeLanguage(language: string) {
    this.language = language
    this.cookieService.set('locale', language, new Date(new Date().getTime() + 86400 * 60 * 1000), '/', null, false, 'Strict')
    this.translateService.use(language)
    // window.location.reload()
  }

  getLocaleLanguage() {
    return LocalKey.VI
    // const languageDefault = this.cookieService.get('locale')
    // if (languageDefault !== LocalKey.VI && languageDefault !== LocalKey.EN) {
    //   this.changeLanguage(LocalKey.VI)
    //   return LocalKey.VI
    // }
    // return languageDefault
  }

}
