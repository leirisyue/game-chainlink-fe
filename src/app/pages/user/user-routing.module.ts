import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../@auth/auth.guard';
import { GameComponent } from './game/game.component';
import { MemoryGameComponent } from './memory-game/memory-game.component';
import { PuzzleGameComponent } from './puzzle-game/puzzle-game.component';
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
    }, {
      path: 'puzzle-game',
      canActivate: [AuthGuard],
      component: PuzzleGameComponent,
      data: { title: 'Puzzle Game' },
    }, {
      path: 'memory-game',
      canActivate: [AuthGuard],
      component: MemoryGameComponent,
      data: { title: 'Memory Game' },
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UserRoutingModule {
}
