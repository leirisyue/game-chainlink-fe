import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-error',
  template: `
  <nb-layout>
    <nb-layout-column>
  <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>
`,
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
