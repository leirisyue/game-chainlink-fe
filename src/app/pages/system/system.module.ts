import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbActionsModule, NbAlertModule, NbAutocompleteModule, NbButtonGroupModule, NbContextMenuModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbInputModule, NbSelectModule, NbTabsetModule, NbTooltipModule } from '@nebular/theme';
import { ComponentsModule } from '../../@components/components.module';
import { SharedModule } from '../../@core/utils/share.module';
import { FormsComponentsModule } from '../../@form/form-components.module';
import { SeparatorModule } from '../../pipes/separator/separator.module';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { RelyingPartyComponent } from './relying-party/relying-party.component';
import { PackagesComponent } from './packages/packages.component';
import { ReplyingPartyFormComponent } from './replying-party-form/replying-party-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SystemComponent,
    RelyingPartyComponent,
    PackagesComponent,
    ReplyingPartyFormComponent
  ],
  imports: [
    SharedModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    NbActionsModule,
    FormsModule,
    SystemRoutingModule,
    NbInputModule,
    NbDatepickerModule,
    NbSelectModule,
    NbAutocompleteModule,
    NbContextMenuModule,
    ComponentsModule,
    NbTooltipModule,
    NbDialogModule.forChild(),
    NbFormFieldModule,
    SeparatorModule,
    NbTabsetModule,
    NbAlertModule,
    NbDateFnsDateModule,
    NbButtonGroupModule,
    FormsComponentsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDividerModule
  ]
})
export class SystemModule { }