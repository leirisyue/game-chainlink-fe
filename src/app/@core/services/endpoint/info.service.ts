import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../backend/common/api/http.service';
import { ServicePackageDto } from '../../interfaces/system/package';
import { RelyingPartyDto, RelyingPartyUpdateForm } from '../../interfaces/system/relying-party';

@Injectable({
   providedIn: 'root'
})
export class InfoService {

   path = 'endpoint'

   constructor(
      private api: HttpService,
   ) { }

   getInfo(): Observable<RelyingPartyDto> {
      return this.api.get(this.path + `/info`)
   }

   updateInfo(form: RelyingPartyUpdateForm): Observable<RelyingPartyDto> {
      return this.api.put(this.path + `/info`, form)
   }

   getServiceLicense(): Observable<ServicePackageDto> {
      return this.api.get(this.path + '/license')
   }

}