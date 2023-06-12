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
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { EndpointRoutingModule } from './endpoint-routing.module';
import { AssertionComponent } from './assertion/assertion.component';
import { EndpointComponent } from './endpoint.component';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersAuthComponent } from './users-auth/users-auth.component';
import { UsersAuthFormComponent } from './users-auth-form/users-auth-form.component';
import { LogComponent } from './log/log.component';

@NgModule({
   declarations: [
      EndpointComponent,
      UsersComponent,
      AssertionComponent,
      UsersFormComponent,
      UsersAuthComponent,
      UsersAuthFormComponent,
      LogComponent,
   ],
   imports: [
      SharedModule,
      MatMenuModule,
      MatSelectModule,
      MatTableModule,
      MatPaginatorModule,
      NbActionsModule,
      FormsModule,
      EndpointRoutingModule,
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
      MatDividerModule,
      MatDividerModule
   ]
})
export class EndpointModule { }