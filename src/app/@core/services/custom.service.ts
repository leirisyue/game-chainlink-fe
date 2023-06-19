import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpService } from '../backend/common/api/http.service';
import { UserAccountDto } from '../interfaces/endpoint/users';
import { CustomCreateForm } from '../interfaces/system/customer';
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


   createCustomAccount(form: CustomCreateForm): Observable<UserAccountDto[]> {
      return this.api.post(this.path + '/createUser', form)
   }
}
