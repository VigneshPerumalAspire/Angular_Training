import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, switchMap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'libraries/sfp-libs/src/lib/shared/constants/global-constants';
import { UrlConstants } from 'libraries/sfp-libs/src/lib/shared/constants/urls';
import * as firebase from 'firebase';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  // API Trigger Dispatch Event For Reset Timer
  notifyPortal = new CustomEvent('resetTimer', {
    detail: 'apitriggered'
  });

  constructor(private http: HttpClient, private readonly urlConstant: UrlConstants) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    window.dispatchEvent(this.notifyPortal);
    return next.handle(request).pipe(catchError((error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          return this.GetRefreshToken().pipe(
            switchMap((token: any) => {
              this.SetSeeionStorageValues(token);
              return next.handle(this.SetHeader(request));
            }),
            retry(0),
            catchError((error: any) => {
              return throwError(error);
            })
          );
        } else {
          return throwError(error)
        }
      }
    }));
  }

  // Set session stroage values after getting refresh token
  SetSeeionStorageValues(token: any): void {
    if (token && token.user._lat && token.credential.accessToken && token.user.refreshToken) {
      sessionStorage.setItem('token', token.user._lat);
      sessionStorage.setItem('sfp-access-token', token.user._lat);
      sessionStorage.setItem('ms-token', token.credential.accessToken);
      sessionStorage.setItem('auth_token', token.credential.accessToken);
      sessionStorage.setItem('ms-refresh-token', token.user.refreshToken);
    }
  }

  // Update header details with new token & headers
  SetHeader(request: HttpRequest<any>) {
    const accessToken = sessionStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        authorization: `Bearer ${accessToken}`,
        'ms-token': sessionStorage.getItem('ms-token')
      }
    });
    return request;
  }

  // Get new refresh token from google getIDToken method
  RefreshToken(): Observable<any> {
    const apiUrl = `${sessionStorage.getItem(GlobalConstants.setRefreshTokenEndpoint)}?key=${sessionStorage.getItem(GlobalConstants.setRefreshTokenKey)}`;
    const requestBody = {
      grant_type: 'refresh_token',
      refresh_token: sessionStorage.getItem('ms-refresh-token')
    }
    return this.http.post(apiUrl, requestBody);
  }
  
  // Get new refresh token from google fireAuth Reauthenticate Popup method
  GetRefreshToken(): Observable<any> {
    const role = localStorage.getItem('role');
    let provider;
    if (role !== 'fnp') {
      if (role) {
        provider = new firebase.auth.OAuthProvider(this.urlConstant.environment.oktaAuthService);
      } else {
        provider = new firebase.auth.OAuthProvider(this.urlConstant.environment.authService);
        const tenandId = this.urlConstant.environment.tenandId;
        provider.setCustomParameters({
          tenant: tenandId,
          domain_hint: this.urlConstant.environment.domainHint
        });
      }
    }
    const refreshTokenObserver$ = new Observable((observer: any) => {
      firebase.auth()
        .currentUser
        .reauthenticateWithPopup(provider)
        .then((response: any) => observer.next(response));
    })
    return refreshTokenObserver$;
  }
}