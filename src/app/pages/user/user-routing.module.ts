import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../@auth/auth.guard';
import { GameComponent } from './game/game.component';
import { UserComponent } from './user.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  data: { role: [] },
  children: [
    {
      path: 'game',
      canActivate: [AuthGuard],
      component: GameComponent,
      data: { title: 'Game' },
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UserRoutingModule {
}
