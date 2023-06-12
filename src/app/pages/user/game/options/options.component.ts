import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataService } from "../data.service";

@Component({
  selector: 'ngx-options',
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss"]
})
export class OptionsComponent implements OnInit {
  option: Observable<String[]>;
  newDeveloper: String;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.option = this.dataService.option;
  }

  deleteOpt(option) {
    this.dataService.deleteNewOption(option);
  }
  addNewDeveloper(option) {
    this.dataService.addNewOption(option);
  }
}
