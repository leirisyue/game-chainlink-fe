import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../../../../@core/utils/message.service';
import { CellLocation } from '../models/cell-location';
import { Direction } from '../models/direction';
import { RandomService } from '../random.service';

@Component({
   selector: 'ngx-number-puzzle-game',
   templateUrl: './number-puzzle-game.component.html',
   styleUrls: ['./number-puzzle-game.component.scss'],
})
export class NumberPuzzleGameComponent implements OnInit, AfterViewInit {
   @Input() numberOfCellsHorizontally = 5;

   @ViewChild('container') containerRef: ElementRef<HTMLDivElement>;
   @ViewChild('board') boardRef: ElementRef<HTMLDivElement>;
   readonly cellBorder = 2;
   readonly gap = 5;
   readonly outerGap = 10;
   readonly emptyCell = null;

   boardCells: HTMLDivElement[][] = [];

   constructor(
      private random: RandomService,
      private messageService: MessageService,
   ) { }

   ngOnInit() { }

   ngAfterViewInit() {
      this.start()
   }

   start() {
      this.boardCells = []
      this.updateBoardWidth();
      const cellElements: HTMLDivElement[] = this.generateCellElements();
      cellElements.forEach((ele) => this.boardRef.nativeElement.appendChild(ele));
      this.boardCells = this.getBoardCells(cellElements);
   }

   updateBoardWidth() {
      const cellWidth = this.getCellWidth();
      const boardWidth =
         (cellWidth + this.cellBorder + 2 + this.gap) *
         this.numberOfCellsHorizontally +
         this.outerGap * 2;
      this.boardRef.nativeElement.style.width = `${boardWidth}px`;
      this.boardRef.nativeElement.style.height = `${boardWidth}px`;
   }

   getCellWidth(): number {
      const containerWidth = this.containerRef.nativeElement.clientWidth;
      const basicCellWidth =
         (containerWidth - this.outerGap * 2) / this.numberOfCellsHorizontally;
      return basicCellWidth - this.gap - this.cellBorder * 2 - 150;
   }

   generateCellElements(): HTMLDivElement[] {
      let index = 0;
      const result: HTMLDivElement[] = [];
      const cellWidth = this.getCellWidth();
      const numbers = this.random.randomRange(
         this.numberOfCellsHorizontally ** 2 - 1
      );
      for (let i = 0; i < this.numberOfCellsHorizontally; i++) {
         for (let j = 0; j < this.numberOfCellsHorizontally; j++) {
            if (
               i === this.numberOfCellsHorizontally - 1 &&
               j === this.numberOfCellsHorizontally - 1
            ) {
               break;
            }
            result.push(
               this.generateCell(i, j, numbers[index++].toString(), cellWidth)
            );
         }
      }
      return result;
   }

   generateCell(
      i: number,
      j: number,
      text: string,
      cellWidth: number
   ): HTMLDivElement {
      const cellEle = document.createElement('div');
      cellEle.classList.add('cell');
      cellEle.textContent = text;
      cellEle.style.width = `${cellWidth}px`;
      cellEle.style.height = `${cellWidth}px`;
      cellEle.style.top = `${i * (cellWidth + this.cellBorder * 2 + this.gap) + this.outerGap}px`;
      cellEle.style.left = `${j * (cellWidth + this.cellBorder * 2 + this.gap) + this.outerGap}px`;
      cellEle.style.borderWidth = `${this.cellBorder}px`;
      cellEle.addEventListener('click', () => this.onCellClick(cellEle));
      return cellEle;
   }

   getBoardCells(cellElements: HTMLDivElement[]): HTMLDivElement[][] {
      const result: HTMLDivElement[][] = [];
      for (let i = 0; i < this.numberOfCellsHorizontally; i++) {
         result[i] = cellElements.slice(
            i * this.numberOfCellsHorizontally,
            (i + 1) * this.numberOfCellsHorizontally
         );
         if (i === this.numberOfCellsHorizontally - 1) {
            result[i][this.numberOfCellsHorizontally - 1] = this.emptyCell;
         }
      }
      return result;
   }

   getCellFromBoard(predicate: (ele: HTMLDivElement) => boolean): CellLocation {
      let result: CellLocation = null;
      for (let i = 0; i < this.numberOfCellsHorizontally; i++) {
         for (let j = 0; j < this.numberOfCellsHorizontally; j++) {
            const ele = this.boardCells[i][j];
            if (predicate(ele)) {
               return {
                  cell: ele,
                  rowIndex: i,
                  columnIndex: j,
               };
            }
         }
      }
      return result;
   }

   getMoveableDirection(cell: CellLocation): Direction {
      const i = cell.rowIndex;
      const j = cell.columnIndex;
      if (
         this.boardCells[i - 1] &&
         this.boardCells[i - 1][j] === this.emptyCell
      ) {
         return 'top';
      }
      if (
         this.boardCells[i + 1] &&
         this.boardCells[i + 1][j] === this.emptyCell
      ) {
         return 'bottom';
      }
      if (this.boardCells[i] && this.boardCells[i][j - 1] === this.emptyCell) {
         return 'left';
      }
      if (this.boardCells[i] && this.boardCells[i][j + 1] === this.emptyCell) {
         return 'right';
      }
      return null;
   }

   move(cellLocation: CellLocation, moveableDirection: Direction) {
      const cell = cellLocation.cell;
      const i = cellLocation.rowIndex;
      const j = cellLocation.columnIndex;
      const cellWidth = this.getCellWidth();
      if (moveableDirection === 'left' || moveableDirection === 'right') {
         const newJ = moveableDirection === 'left' ? j - 1 : j + 1;
         cell.style.left = `${newJ * (cellWidth + this.cellBorder * 2 + this.gap) + this.outerGap
            }px`;
         this.boardCells[i][newJ] = cell;
         this.boardCells[i][j] = this.emptyCell;
      }
      if (moveableDirection === 'top' || moveableDirection === 'bottom') {
         const newI = moveableDirection === 'top' ? i - 1 : i + 1;
         cell.style.top = `${newI * (cellWidth + this.cellBorder * 2 + this.gap) + this.outerGap
            }px`;
         this.boardCells[newI][j] = cell;
         this.boardCells[i][j] = this.emptyCell;
      }
   }

   onCellClick(cellEle: HTMLDivElement) {
      const cellLocation = this.getCellFromBoard((x) => x === cellEle);
      const moveableDirection = this.getMoveableDirection(cellLocation);
      if (moveableDirection) {
         this.move(cellLocation, moveableDirection);
         this.showMessageIfWin();
      }
   }

   showMessageIfWin() {
      let number = 1;
      let foundIncorrect = false;
      const cells: HTMLDivElement[] = [];
      this.boardCells.forEach((row) => cells.push(...row));
      for (let i = 0; i < this.numberOfCellsHorizontally ** 2 - 1; i++) {
         if (
            cells[i] === this.emptyCell ||
            cells[i].textContent !== number.toString()
         ) {
            foundIncorrect = true;
            break;
         }
         number++;
      }
      if (!foundIncorrect) {
         this.messageService.winner()

      }
   }
}
