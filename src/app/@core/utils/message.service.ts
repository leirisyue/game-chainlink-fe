import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AuthService } from './../../@auth/auth.service';
import { ACTIVE, DELETE, INACTIVE } from './../interfaces/variable';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  loadingText = ''
  duration = 15000

  constructor(
    private toastrService: NbToastrService,
    private translateService: TranslateService,
    // private dialog: MatDialog,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) { }

  showSpinner(text?: string) {
    this.loadingText = text
    this.spinner.show()
  }

  hideSpinner() {
    this.spinner.hide()
  }

  successByType(type: string) {
    this.successById(`Message.${type}`)
  }

  async successById(id: string) {
    const text = await this.translateService.get(id).toPromise()
    this.successByText(text)
  }

  async successByText(text: string) {
    let title = 'Thành công'
    // const title = await this.translateService.get('Message.Success').toPromise()
    this.message(title, text, 'success')
  }

  async success(type: string) {
    const text = await this.translateService.get(`Message.${type}`).toPromise()
    this.message(text, '', 'success')
  }
  async warning(type: string) {
    const text = await this.translateService.get(`Message.${type}`).toPromise()
    this.message(text, '', 'warning')
  }

  async errorByText(text: string, status?: number) {
    if (status === 406 || (text === undefined && status === undefined)) { return; }
    // let title = await this.translateService.get('Message.Error').toPromise()
    let title = 'Lỗi'
    if (status === 400) {
      // if ((text.includes('Validation')) || text.includes('Dto')) {
      //   text = await this.translateService.get('Message.InvalidData').toPromise()
      // }
    }
    else if (status === 401) {
      this.authService.logOut()
      // text = await this.translateService.get('Message.Unauthorized').toPromise()
      this.router.navigate(['auth/login'])
    }
    else if (status === 0) {
      this.hideSpinner()
      this.router.navigate(['error/500'])
      return;
    } else {
      if (text == null || text === undefined || text === '') {
        text = 'Không xác định'
        // text = await this.translateService.get('Message.Undefined').toPromise()
        if (status) { title += ` ${status}` }
      }
    }
    this.message(title, text, 'error')
  }

  async errorById(id: string) {
    // const title = await this.translateService.get('Message.Error').toPromise()
    const title = 'Lỗi'
    const text = await this.translateService.get(id).toPromise()
    this.message(title, text, 'error')
  }

  async errorToastByText(text: string) {
    // const title = await this.translateService.get('Message.Error').toPromise()
    const title = 'Lỗi'
    this.toastrService.danger(text, title, { duration: this.duration });
  }

  message(title: string, text: string, type: any) {
    this.loadingText = ''
    // Swal.fire(title, text, type)
    switch (type) {
      case 'success':
        this.toastrService.success(text, title, { duration: this.duration, preventDuplicates: true })
        break;
      case 'warning':
        this.toastrService.warning(text, title, { duration: this.duration, preventDuplicates: true })
        break;
      default:
        this.toastrService.danger(text, title, { duration: this.duration, preventDuplicates: true })
        break;
    }
    this.hideSpinner()
  }

  // async toastrErrorByText(message: string, status?: number) {
  //   let title = await this.translateService.get('Config.Error').toPromise()

  //   if (message) {
  //     if ((status === 400 && message.includes('Validation')) || message.includes('Dto')) {
  //       message = await this.translateService.get('Config.InvalidData').toPromise()
  //     }
  //   } else {
  //     message = await this.translateService.get('Auth.Undefined').toPromise()
  //     if (status) { title += ` ${status}` }
  //   }
  // }

  async getSwalOK(message: string) {
    let isYes = false
    await Swal.fire({
      // text: message,
      html: message,
      icon: 'success',
      confirmButtonColor: '#303ab2',
      cancelButtonColor: '#d33',
      showCancelButton: false,
      confirmButtonText: 'Đồng ý'
    }).then((result) => isYes = result.value)
    return isYes
  }

  async getSwalWarning(message: string) {
    let isYes = false
    await Swal.fire({
      // text: message,
      html: message,
      icon: 'warning',
      confirmButtonColor: '#303ab2',
      cancelButtonColor: '#d33',
      showCancelButton: false,
      confirmButtonText: 'Đồng ý'
    }).then((result) => isYes = result.value)
    return isYes
  }

  async getSwal(message: string) {
    if (message === DELETE) {
      message = 'Xác nhận xóa?'
    }
    if (message === ACTIVE) {
      message = 'Xác nhận kích hoạt?'
    }
    if (message === INACTIVE) {
      message = 'Xác nhận vô hiệu hóa?'
    }
    let isYes = false
    await Swal.fire({
      // text: message,
      html: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#303ab2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => isYes = result.value)
    return isYes
  }
  async getSwalYes(title: string, text?: string) {
    let isYes = false
    const textSmall = text ? await this.translateService.get('Message.' + text).toPromise() : ''
    await Swal.fire({
      title: await this.translateService.get('Message.' + title).toPromise(),
      icon: 'success',
      showCancelButton: false,
      text: textSmall,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Đồng ý',
    })
      .then((result) => isYes = result.value)
    return isYes
  }

  async getSwalInput(title: string) {
    let reason = ''
    await Swal.fire({
      title: await this.translateService.get('Message.' + title).toPromise(),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#303ab2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
      input: 'text',
      customClass: { input: 'text-center' },
      // inputPlaceholder: 'Vui lòng nhập lý do từ chối',
      // inputValue: code,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          // if (value.length >= 1 && value.length <= 256) { resolve(null); }
          if (value.length <= 0) { resolve('required'); } else { resolve(null); }
          // if (value.length > 256) { resolve(maxLength); }
        });
      },
      preConfirm: (name) => { reason = name }
    });
    return reason
  }

  winner() {
    Swal.fire({
      title: 'YOU WIN !!!',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url("https://media4.giphy.com/media/5jT0jaNDsM6Ik7X9yq/giphy.gif")',
      backdrop: `
        rgba(0,0,123,0.4)
        url("../../../assets/images/nyan cat.gif")
        left top
        no-repeat
      `
    })
  }
}
