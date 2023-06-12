/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeparatorModule } from '../pipes/separator/separator.module';
import { NgxValidationMessageComponent } from './validation-message/validation-message.component';

const COMPONENTS = [
  NgxValidationMessageComponent,
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SeparatorModule,
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class ComponentsModule {
}
