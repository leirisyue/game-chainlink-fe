import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: 'ngx-clip-text',
  templateUrl: './clip-text.component.html',
  styleUrls: ['./clip-text.component.scss']
})
export class ClipTextComponent implements OnInit {
  constructor(public dataService: DataService) { }

  value = "";
  list = []

  ngOnInit() {
    this.dataService.winners.subscribe(winners => {
      this.list = []
      let text = `PRs \n`;
      winners.forEach((winner, i) => {
        (text += `${i + 1}. ${winner}\n`)
        this.list.push(winner)
      });
      this.value = text;
    });
  }
}
