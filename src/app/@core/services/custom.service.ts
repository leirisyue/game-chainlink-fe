import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpService } from '../backend/common/api/http.service';
import { RelyingPartyDto } from '../interfaces/system/relying-party';

@Injectable({
   providedIn: 'root'
})
export class CustomService {

   path = 'customer'

   constructor(
      private api: HttpService,
   ) { }

   findAllRelyingParty(): Observable<RelyingPartyDto[]> {
      return this.api.get(this.path + '/relying-party')
   }


}
