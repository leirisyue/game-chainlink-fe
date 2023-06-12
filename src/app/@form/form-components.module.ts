import { NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbTooltipModule, NB_TIME_PICKER_CONFIG } from '@nebular/theme';
import { SeparatorModule } from './../pipes/separator/separator.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ComponentsModule } from '../@components/components.module';
import { I18nModule } from '../@core/utils/i18n.module';
import { SeparatorNumberModule } from '../@core/utils/separator-number.module';
import { ThemeModule } from '../@theme/theme.module';
import { PackagesFormComponent } from './packages-form/packages-form.component';

const COMPONENTS = [
  PackagesFormComponent
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NbCardModule,
    NbButtonGroupModule,
    ThemeModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    I18nModule,
    SeparatorModule,
    NbSelectModule,
    NbRadioModule,
    NbAutocompleteModule,
    NbDatepickerModule,
    ComponentsModule,
    NbFormFieldModule,
    SeparatorNumberModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    NbTooltipModule,
    NbTabsetModule,
    NbCheckboxModule
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [
    { provide: NB_TIME_PICKER_CONFIG, useValue: {} }
    // { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter  },
  ]
})
export class FormsComponentsModule {
}
