import { Component, OnInit } from "@angular/core";
import { DataService } from "./data.service";

@Component({
  selector: 'ngx-game',
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  name = "Angular";

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    console.log('test')
  }

  resetWheel() {
    this.dataService.resetToDefault();
  }
}
