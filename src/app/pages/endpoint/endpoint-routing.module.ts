import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../@auth/auth.guard';
import { EndpointComponent } from './endpoint.component';
import { UsersComponent } from './users/users.component';
import { AssertionComponent } from './assertion/assertion.component';
import { UsersAuthComponent } from './users-auth/users-auth.component';
import { LogComponent } from './log/log.component';

const routes: Routes = [{
   path: '',
   component: EndpointComponent,
   data: { role: [] },
   children: [
      {
         path: 'users',
         canActivate: [AuthGuard],
         component: UsersComponent,
         data: { title: 'Users' },
      },
      {
         path: 'users-authenticators/:id',
         canActivate: [AuthGuard],
         component: UsersAuthComponent,
         data: { title: 'Users' },
      },
      {
         path: 'assertion',
         canActivate: [AuthGuard],
         component: AssertionComponent,
         data: { title: 'Assertion' },
      },
      {
         path: 'log',
         canActivate: [AuthGuard],
         component: LogComponent,
         data: { title: 'log' },
      }
   ],
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class EndpointRoutingModule {
}
