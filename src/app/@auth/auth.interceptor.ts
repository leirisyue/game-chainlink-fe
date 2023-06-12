import { environment } from './../../environments/environment';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { MessageService } from '../@core/utils/message.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';
const TOKEN_HEADER_TYPE = 'Bearer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('assets/i18n')) {
      const url = req.url.replace(environment.apiUrl, '')
      console.warn(`${req.method} | ${url} | `, req.body);
    }
    console.warn(`${req.method} | ${req.url} | `, req.body);
    const accessToken = this.authService.getJwtToken();
    req = req.clone({
      withCredentials: true,
      headers: req.headers
        // .set('Client-Language', this.languageService.language)
        .set('Client-Id', this.cookieService.get('client_id'))
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Credentials', 'true')
        .set('Content-Type', 'application/json')
      // .set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe')
    });
    if (accessToken) {
      req = req.clone({
        headers: req.headers.set(
          TOKEN_HEADER_KEY,
          `${TOKEN_HEADER_TYPE} ${accessToken}`
        ),
      });
    }

    return next.handle(req).pipe(
      tap((res: HttpResponse<any>) => {
        if (res?.body && !req.url.includes('assets/i18n')) {
          const url = res.url.replace(environment.apiUrl, '')
          console.info(`${res.status} | ${url} | `, res?.body);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(`ERROR: '${error?.status}' `, error);
        this.messageService.errorByText(
          error?.error?.errorMessage || error?.message || error?.error,
          error?.status
        );
        if (error.status === 401) {
          this.router.navigate(['auth/login']);
        }
        return throwError(error);
      }),
      finalize(() => { })
    );
  }
}