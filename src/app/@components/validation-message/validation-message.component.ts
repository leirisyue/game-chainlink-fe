/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-validation-message',
  styleUrls: ['./validation-message.component.scss'],
  template: `
      <div class="warning">
          <span class="caption status-danger"
             *ngIf="showMinLength">Độ dài tối thiểu là {{ minLength }} ký tự </span>
          <span class="caption status-danger"
             *ngIf="showMaxLength">Độ dài tối đa là  {{ maxLength }} ký tự </span>
          <span class="caption status-danger" *ngIf="showPattern"> {{ label }} không hợp lệ</span>
          <span class="caption status-danger" *ngIf="showRequired"> {{ label }} bắt buộc nhập dữ liệu</span>
          <span class="caption status-danger" *ngIf="showMin">Giá trị nhỏ nhất của {{ label }} là {{ min }}</span>
          <span class="caption status-danger" *ngIf="showMax">Giá trị lớn nhất của {{ label }} là {{ max }}</span>
          <span class="caption status-danger" *ngIf="showNotFound">Không tìm thấy <span class="text-lowercase">{{ label }} trong danh sách</span></span>
          <div class="caption status-danger" *ngIf="textTransform">Giá trị nhập vào không dấu và không chứa số</div>
          <span class="caption status-danger" *ngIf="lengthList">Danh sách <span class="text-lowercase">{{ label }}</span> trống</span>
          <span class="caption status-danger" *ngIf="showVoucherDate">Ngày chứng từ không được sau ngày hạch toán</span>
          <span class="caption status-danger" *ngIf="maxAmount">Số tiền chi vượt quá số dư ({{total | separator}} đ)</span>
          <span class="caption status-danger" *ngIf="showQuantity">Số lượng tối đa là {{quantity}}</span>
      </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxValidationMessageComponent),
      multi: true,
    },
  ],
})
export class NgxValidationMessageComponent {
  @Input()
  label: string = '';

  @Input()
  showRequired?: boolean;

  @Input()
  total?: number;

  @Input()
  min?: number;

  @Input()
  showMin?: boolean;

  @Input()
  max?: number;

  @Input()
  showMax: boolean;

  @Input()
  minLength?: number;

  @Input()
  showMinLength?: boolean;

  @Input()
  maxLength?: number;

  @Input()
  showMaxLength?: boolean;

  @Input()
  showPattern?: boolean;

  @Input()
  showNotFound?: boolean;

  @Input()
  textTransform?: boolean;

  @Input()
  lengthList?: boolean;

  @Input()
  showVoucherDate?: boolean;

  @Input()
  maxAmount?: boolean;

  @Input()
  showQuantity?: boolean;

  @Input()
  quantity?: number;
}
