import { G } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { isNumberKey, isTaxCode } from '../../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(
    private cookieService: CookieService,
  ) {
  }
  checkSidebar = false
  breadcrumb = {
    url1: null,
    title1: null,
    url2: null,
    title2: null,
    url3: null,
    title3: null,
    url4: null,
    title4: null,
    url5: null,
    title5: null,
    url6: null,
    title6: null
  };


  isNumberKey(keyCode, ctrlKey, altKey, shiftKey) {
    return isNumberKey(keyCode, ctrlKey, altKey, shiftKey)
  }

  isTaxCode(keyCode, ctrlKey, altKey, shiftKey) {
    return isTaxCode(keyCode, ctrlKey, altKey, shiftKey)
  }

  isTextKey(keyCode) {
    return (keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123) || keyCode == 8 || keyCode == 32
  }

  isFax(keyCode, ctrlKey, altKey, shiftKey) {
    return (ctrlKey || altKey || shiftKey
      || (47 < keyCode && keyCode < 58 && shiftKey == false)
      || (95 < keyCode && keyCode < 106)
      || (keyCode == 8) || (keyCode == 9)
      || (keyCode > 34 && keyCode < 40)
      || (keyCode == 46)
      || (keyCode == 43)
    )
  }


  changeAmountMillisecond(amount: number) {
    let timezone = ''
    if (amount % 86400000 === 0) {
      timezone = 'date'
    } else if (amount % 3600000 === 0) {
      timezone = 'hour'
    } else if (amount % 60000 === 0) {
      timezone = 'minutes'
    } else if (amount % 1000 === 0) {
      timezone = 'second'
    }
    return timezone
  }
  changeAmountTimePlus(amount: number, timezone: string) {
    let timePlus = 0
    switch (timezone) {
      case 'second':
        timePlus = amount / 1000
        break;
      case 'minutes':
        timePlus = amount / (60 * 1000)
        break;
      case 'hour':
        timePlus = amount / (60 * 60 * 1000)
        break;
      case 'date':
        timePlus = amount / (24 * 60 * 60 * 1000)
        break;
      default:
        timePlus = 1
        break;
    }
    return timePlus
  }

}
