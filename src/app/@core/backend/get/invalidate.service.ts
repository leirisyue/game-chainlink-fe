import { G } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { isNumberKey, isTaxCode } from '../../utils/helpers';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class InvalidateService {
  // check desktop
  isDesktop = false;
  isMobile = false;
  isTablet = false;
  constructor(
    private cookieService: CookieService,
    private deviceService: DeviceDetectorService,
  ) {
    if (deviceService.isDesktop()) {
      this.isDesktop = true;
    } else {
      this.isDesktop = false;
    }
    if (deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    if (deviceService.isTablet()) {
      this.isTablet = true;
    } else {
      this.isTablet = false;
    }
  }
  convertNumberToChar(inputNumber: number) {
    const unitNumbers = { 0: "không", 1: "một", 2: "hai", 3: "ba", 4: "bốn", 5: "năm", 6: "sáu", 7: "bảy", 8: "tám", 9: "chín" };
    const placeValues = { 0: "", 100: "trăm", 1000: "nghìn", 1000000: "triệu", 1000000000: "tỷ" }
    let inputString = inputNumber.toString()
  }
  dvBlock = '1 nghìn triệu tỷ'.split(' ');
  defaultNumbers = ' hai ba bốn năm sáu bảy tám chín';
  chuHangDonVi = ('1 một' + this.defaultNumbers).split(' ');
  chuHangChuc = ('lẻ mười' + this.defaultNumbers).split(' ');
  chuHangTram = ('không một' + this.defaultNumbers).split(' ');
  to_vietnamese(number) {
    var str = parseInt(number) + '';
    var i = 0;
    var arr = [];
    var index = str.length;
    var result = [];
    var rsString = '';
    if (index == 0 || str == 'NaN') {
      return '';
    }
    while (index >= 0) {
      arr.push(str.substring(index, Math.max(index - 3, 0)));
      index -= 3;
    }
    for (i = arr.length - 1; i >= 0; i--) {
      if (arr[i] != '' && arr[i] != '000') {
        result.push(this.convert_block_three(arr[i]));
        if (this.dvBlock[i]) {
          result.push(this.dvBlock[i]);
        }
      }
    }
    rsString = result.join(' ');
    return rsString.replace(/[0-9]/g, '').replace(/ /g, ' ').replace(/ $/, '');
  }
  convert_block_three(number) {
    if (number == '000') return '';
    var _a = number + '';
    switch (_a.length) {
      case 0: return '';
      case 1: return this.chuHangDonVi[_a];
      case 2: return this.convert_block_two(_a);
      case 3:
        var chuc_dv = '';
        if (_a.slice(1, 3) != '00') {
          chuc_dv = this.convert_block_two(_a.slice(1, 3));
        }
        var tram = this.chuHangTram[_a[0]] + ' trăm';
        return tram + ' ' + chuc_dv;
    }
  }
  convert_block_two(number) {
    var dv = this.chuHangDonVi[number[1]];
    var chuc = this.chuHangChuc[number[0]];
    var append = '';
    if (number[0] > 0 && number[1] == 5) {
      dv = 'lăm'
    }
    if (number[0] > 1) {
      append = ' mươi';
      if (number[1] == 1) {
        dv = ' mốt';
      }
    }
    return chuc + '' + append + ' ' + dv;
  }
  keyNumber(keyCode, ctrlKey, altKey, shiftKey) {
    return (ctrlKey || altKey
      || (47 < keyCode && keyCode < 58 && shiftKey == false)
      || (95 < keyCode && keyCode < 106)
      || (keyCode == 8) || (keyCode == 9)
      || (keyCode > 34 && keyCode < 40)
      || (keyCode == 46))
  }
  keyTax(keyCode, ctrlKey, altKey, shiftKey) {
    return isNumberKey(keyCode, ctrlKey, altKey, shiftKey) || keyCode == 189 || keyCode == 109
  }
  keyText(keyCode) {
    return (keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123) || keyCode == 8 || keyCode == 32
  }
  keyFax(keyCode, ctrlKey, altKey, shiftKey) {
    return (ctrlKey || altKey || shiftKey
      || (47 < keyCode && keyCode < 58 && shiftKey == false)
      || (95 < keyCode && keyCode < 106)
      || (keyCode == 8) || (keyCode == 9)
      || (keyCode > 34 && keyCode < 40)
      || (keyCode == 46)
      || (keyCode == 43)
    )
  }
  getTimeNow(a: any) {
    const b = new Date()
    a.setHours(b.getHours())
    a.setMinutes(b.getSeconds())
    a.setSeconds(b.getSeconds())
    return a
  }

  getFormatDateInput(date: Date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return day + '/' + month + '/' + year
  }

  getFormatDateTimeInput(date: Date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const min = date.getMinutes()
    const second = date.getSeconds()
    return day + '-' + month + '-' + year + " " + hours + ":" + min + ":" + second
  }

  randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = '';
    for (let i = length; i > 0; --i) { result += chars[Math.floor(Math.random() * chars.length)]; }
    return result;
  }

}
