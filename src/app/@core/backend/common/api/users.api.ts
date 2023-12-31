/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { HttpService } from './http.service';

@Injectable()
export class UsersApi {
  private readonly apiController: string = 'users';

  constructor(private api: HttpService) {}

  get usersDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}`);
  }

  // getCurrent(): Observable<any> {
    // return this.api.get(`${this.apiController}/current`)
    //   .pipe(map(data => {
    //     const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
    //     return { ...data, picture };
    //   }));
  // }

  // get(id: number): Observable<any> {
    // return this.api.get(`${this.apiController}/${id}`)
    //   .pipe(map(data => {
    //     const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
    //     return { ...data, picture };
    //   }));
  // }

  // delete(id: number): Observable<boolean> {
  //   return this.api.delete(`${this.apiController}/${id}`);
  // }

  // add(item: any): Observable<any> {
  //   return this.api.post(this.apiController, item);
  // }

  // updateCurrent(item: any): Observable<any> {
  //   return this.api.put(`${this.apiController}/current`, item);
  // }

  // update(item: any): Observable<any> {
  //   return this.api.put(`${this.apiController}/${item.id}`, item);
  // }
}
