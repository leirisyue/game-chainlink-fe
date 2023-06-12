import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SeparatorPipe } from './separator.pipe';


@NgModule({
  // imports: [NgbModule],
  declarations: [SeparatorPipe],
  exports: [SeparatorPipe]
})
export class SeparatorModule { }
