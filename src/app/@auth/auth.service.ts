import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom, Observable, of } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { HttpService } from '../@core/backend/common/api/http.service';
import { Role } from '../@core/interfaces/enum';
import { AUTHORITIES_KEY, DATABASE_ID, LOGGED_ID_KEY, PARTITION_ID, TOKEN_KEY } from '../@core/interfaces/variable';
import { AccessToken, SystemLoginForm } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public jwtHelper = new JwtHelperService()
  path = 'auth'
  subject = ''

  constructor(
    private api: HttpService,
    private cookieService: CookieService,
  ) { }

  generateSystemAccessToken(data: any): Observable<AccessToken> {
    this.subject = Role.SYSTEM
    return this.api.post(this.path + '/system/access-token', data)
  }

  generateEndpointAccessToken(data: any): Observable<AccessToken> {
    this.subject = Role.USER
    return this.api.post(this.path + '/endpoint/access-token', data)
  }

  loginSystem(form) {
    return this.api.post(this.path + 'system/access-token', form).pipe(
      tap((tokens: AccessToken) => this.storeTokens(tokens)),
      mapTo({ isLoggedIn: true }),
      catchError(error => {
        return of({ isLoggedIn: false, message: error?.error?.message })
      })
    )
  }


  // -----------------------
  getClientId() {
    // let clientAuthId = this.cookieService.get('client_id')
    // if (clientAuthId && !isNew) {
    //   return clientAuthId
    // }
    const clientAuthId = this.randomString(32)
    this.cookieService.set('client_id', clientAuthId, 365, '/', null, false, 'Strict')
    return clientAuthId
  }

  randomString(length, chars?) {
    chars = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = length; i > 0; --i) { result += chars[Math.floor(Math.random() * chars.length)] }
    return result
  }

  isAuthenticated(): boolean {
    let token = this.getJwtToken()
    return !this.jwtHelper.isTokenExpired(token);
  }

  // public async doRefreshTokens(tokens: AuthorizationToken) {
  //   this.removeTokens()
  //   this.storeTokens(tokens)
  // }

  logOut() {
    this.removeTokens()
  }

  private getNameToken() {
    return TOKEN_KEY + '_' + this.getLoggedId()
  }

  private getNamePartitionToken(partitionId?: string) {
    if (!partitionId) {
      partitionId = localStorage.getItem(PARTITION_ID)
    }
    return this.getNameToken() + '_' + partitionId
  }

  private getNameDatabaseToken(partitionId?: string, databaseId?: string) {
    if (!partitionId) {
      partitionId = localStorage.getItem(PARTITION_ID)
    }
    if (!databaseId) {
      databaseId = localStorage.getItem(DATABASE_ID)
    }
    return this.getNamePartitionToken(partitionId) + '_' + databaseId
  }

  getLoggedId() {
    return localStorage.getItem(LOGGED_ID_KEY)
  }

  getJwtToken() {
    let token = this.cookieService.get(this.getNameDatabaseToken())
    if (!token || token === '') {
      token = this.cookieService.get(this.getNamePartitionToken())

      if (!token || token === '') {
        token = this.cookieService.get(this.getNameToken())
      }
    }
    return token
  }

  storeTokens(tokens) {
    console.log("🚀 ~ storeTokens ~ tokens:", tokens);
    localStorage.setItem(LOGGED_ID_KEY, tokens.subject)
    const accessToken = tokens.accessToken || tokens.token
    localStorage.setItem(AUTHORITIES_KEY, btoa(JSON.stringify(accessToken)))
    const expirationDate = this.jwtHelper.getTokenExpirationDate(accessToken)
    this.cookieService.set(
      this.getNameToken(), accessToken, expirationDate, '/', null, false, 'Strict'
    )
  }

  public removeTokens() {
    this.cookieService.deleteAll('/')
    // this.cookieService.delete(this.getNameToken())
    // this.cookieService.delete(this.getNamePartitionToken())
    // this.cookieService.delete(this.getNameDatabaseToken())
    localStorage.removeItem(LOGGED_ID_KEY)
    localStorage.removeItem(AUTHORITIES_KEY)
    localStorage.removeItem(DATABASE_ID)

  }

  isRole(role: string): boolean {
    if (!this.subject) {
      this.subject = localStorage.getItem('Subject')
    }
    if (this.subject && this.subject !== Role.SYSTEM) {
      this.subject = Role.USER
    }
    try {
      return this.subject === role
    } catch (e) {
      return false
    }
  }
}
