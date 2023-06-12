import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../@auth/auth.guard';
import { PackagesComponent } from './packages/packages.component';
import { RelyingPartyComponent } from './relying-party/relying-party.component';
import { SystemComponent } from './system.component';

const routes: Routes = [{
  path: '',
  component: SystemComponent,
  data: { role: [] },
  children: [
    {
      path: 'relying-party',
      canActivate: [AuthGuard],
      component: RelyingPartyComponent,
      data: { title: 'Khách hàng' },
    }, {
      path: 'packages',
      canActivate: [AuthGuard],
      component: PackagesComponent,
      data: { title: 'Packages' },
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SystemRoutingModule {
}
