import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpService } from '../../backend/common/api/http.service';
import { RelyingPartyDto, RelyingPartyUpdateForm } from '../../interfaces/system/relying-party';

@Injectable({
  providedIn: 'root'
})
export class RelyingPartyService {

  path = 'system/relying-party'

  constructor(
    private api: HttpService,
  ) { }

  findAllRelyingParty(): Observable<RelyingPartyDto[]> {
    return this.api.get(this.path)
  }

  createRelyingParty(form: RelyingPartyUpdateForm): Observable<RelyingPartyDto> {
    return this.api.post(this.path, form)
  }

  deleteRelyingParty(id: string): Observable<RelyingPartyDto> {
    return this.api.delete(this.path + `/${id}`)
  }

  updateRelyingParty(form: RelyingPartyUpdateForm, id: string): Observable<RelyingPartyDto> {
    return this.api.put(this.path + `/${id}`, form)
  }

  updateRelyingPartyStatusActive(id: string): Observable<RelyingPartyDto> {
    return this.api.put(this.path + `/${id}/active`, null)
  }

  updateRelyingPartyStatusInactive(id: string): Observable<RelyingPartyDto> {
    return this.api.put(this.path + `/${id}/inactive`, null)
  }

  getRelyingPartyServicePackage(id: string): Observable<RelyingPartyDto[]> {
    return this.api.get(this.path + `/${id}/packages`)
  }

  getRelyingPartyUserAccount(id: string): Observable<RelyingPartyDto[]> {
    return this.api.get(this.path + `/${id}/user-accounts`)
  }

  getRelyingPartyUserAuthenticator(id: string): Observable<RelyingPartyDto[]> {
    return this.api.get(this.path + `/${id}/user-authenticators`)
  }
}
