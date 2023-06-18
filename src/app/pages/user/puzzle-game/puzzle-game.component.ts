import { Component, VERSION } from '@angular/core';
import { RandomService } from './random.service';

@Component({
   selector: 'ngx-puzzle-game',
   templateUrl: './puzzle-game.component.html',
   styleUrls: ['./puzzle-game.component.scss']
})
export class PuzzleGameComponent {
   constructor(private random: RandomService) {

   }
}
