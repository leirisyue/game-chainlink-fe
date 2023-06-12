import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatGridListModule } from "@angular/material/grid-list";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatButtonModule } from "@angular/material/button";
import { ClipTextComponent } from "./game/clip-text/clip-text.component";
import { DataService } from "./game/data.service";
import { OptionsComponent } from "./game/options/options.component";
import { WheelComponent } from "./game/wheel/wheel.component";
import { GameComponent } from "./game/game.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { NbDateFnsDateModule } from "@nebular/date-fns";
import { NbActionsModule, NbInputModule, NbDatepickerModule, NbSelectModule, NbAutocompleteModule, NbContextMenuModule, NbTooltipModule, NbDialogModule, NbFormFieldModule, NbTabsetModule, NbAlertModule, NbButtonGroupModule } from "@nebular/theme";
import { ComponentsModule } from "../../@components/components.module";
import { SharedModule } from "../../@core/utils/share.module";
import { FormsComponentsModule } from "../../@form/form-components.module";
import { SeparatorModule } from "../../pipes/separator/separator.module";
import { SystemRoutingModule } from "../system/system-routing.module";
import { UserComponent } from "./user.component";

const GameModuleImport = [
  BrowserModule,
  FormsModule,
  MatInputModule,
  MatIconModule,
  MatGridListModule,
  BrowserAnimationsModule,
  ClipboardModule,
  MatButtonModule
]

const PageModuleImport = [
  SharedModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  NbActionsModule,
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

@NgModule({
  imports: [
    GameModuleImport,
    PageModuleImport
  ],
  declarations: [
    WheelComponent,
    OptionsComponent,
    ClipTextComponent,
    GameComponent,
    UserComponent
  ],
  bootstrap: [UserComponent],
  providers: [DataService]
})
export class UserModule { }
