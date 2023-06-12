import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../backend/common/api/http.service';
import { UserAccountCreateForm, UserAccountDto } from '../../interfaces/endpoint/users';
import { AuthenticatorDto, UserAuthenticatorUpdateForm } from '../../interfaces/authenticators';

@Injectable({
   providedIn: 'root'
})
export class UsersService {

   path = 'endpoint/users'

   constructor(
      private api: HttpService,
   ) { }

   getAllUserAccount(): Observable<UserAccountDto[]> {
      return this.api.get(this.path)
   }

   getUserAccountById(id: string): Observable<UserAccountDto> {
      return this.api.get(this.path + `/${id}`)
   }

   getAllUserAuthenticator(id: string): Observable<AuthenticatorDto[]> {
      return this.api.get(this.path + `/${id}/authenticators`)
   }

   createUserAccount(form: UserAccountCreateForm): Observable<UserAccountDto> {
      return this.api.post(this.path, form)
   }

   deleteUserAccount(id: string): Observable<UserAccountDto> {
      return this.api.delete(this.path + `/${id}`, null)
   }

   updateUserAuthenticator(form: UserAuthenticatorUpdateForm, id: string, authenticatorId: string): Observable<AuthenticatorDto> {
      return this.api.put(this.path + `/${id}/authenticators/${authenticatorId}`, form)
   }

   deleteUserAuthenticator(id: string, authenticatorId: string): Observable<AuthenticatorDto> {
      return this.api.delete(this.path + `/${id}/authenticators/${authenticatorId}`, null)
   }

}