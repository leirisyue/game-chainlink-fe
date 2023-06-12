/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-app',
  template: `<router-outlet></router-outlet> 
  <ngx-spinner type="ball-clip-rotate" ></ngx-spinner>
  `,
})
export class AppComponent implements OnInit, OnDestroy {

  constructor( ) { }

  ngOnInit(): void { }

  ngOnDestroy() { }
}
