import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class DataService {
  _defaultOpts = [
    "Deal 20%",
    "Deal 10%",
    "Unlucky",
    "Gift",
    "-10.000đ",
    "-20.000đ"
  ];

  countSpin = 5
  optionSource: BehaviorSubject<String[]>;
  options;

  winnersSource: BehaviorSubject<String[]>;
  winners: Observable<String[]>;

  constructor() {
    this.optionSource = new BehaviorSubject(this.getOptions());
    this.options = this.optionSource.asObservable();

    this.winnersSource = new BehaviorSubject([]);
    this.winners = this.winnersSource.asObservable();
  }

  addNewOption(value) {
    const currentOpts = [...this.optionSource.getValue()];
    currentOpts.push(value);
    this.optionSource.next(currentOpts);
    this.persistOptions();
  }

  deleteNewOption(value) {
    const currentOpts = this.optionSource.getValue();
    this.optionSource.next(currentOpts.filter(opts => opts != value));
    this.persistOptions();
  }

  addWinner(value) {
    let winners = this.winnersSource.getValue();
    winners = [...winners, value];
    this.winnersSource.next(winners);
  }

  restartWinners() {
    this.winnersSource.next([]);
  }

  persistOptions() {
    localStorage.setItem("OPTS", JSON.stringify(this.optionSource.getValue()));
  }

  getOptions(): String[] {
    const value = localStorage.getItem("OPTS");
    return this._defaultOpts;
  }

  resetToDefault() {
    this.optionSource.next(this._defaultOpts);
  }
}
