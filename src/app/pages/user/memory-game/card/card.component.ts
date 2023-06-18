import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICard } from './models';

@Component({
   selector: 'ngx-card',
   templateUrl: './card.component.html',
   styleUrls: ['./card.component.scss']
})

export class CardComponent {
   @Input() card: ICard;
   @Output() clicked = new EventEmitter();

   constructor() { console.log("abc") }

   cardClick() {
      this.clicked.emit([this.card.id, this.card.imageId]);
   }

}