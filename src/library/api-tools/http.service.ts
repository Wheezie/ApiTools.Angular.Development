import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from './responses/auth-response';

import { AuthStatus } from './auth-status.enum';
import { StorageService } from './storage.service';
import { BadRequestResponse } from './responses/bad-request-response';

import { Subject, Observable, of } from 'rxjs';
import { retry, map, share, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private static readonly STORAGE_TOKEN = 'APITOOLS_TOKEN';

  private _authSubject: Subject<AuthStatus> = new Subject<AuthStatus>();
  private _options = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'}),
  };

  private _url: string;
  constructor(private _http: HttpClient, private _storage: StorageService) {}

  Get<T>(uri: string, retries = 2) {
    return this._http.get<T>(this.url(uri), this._options)
      .pipe(retry(retries), share());
  }

  Post<T>(uri: string, body: any, retries = 1) {
    return this._http.post<T>(this.url(uri), body, this._options)
      .pipe(retry(retries));
  }

  Authenticate(username: string, password: string) {
    this.Post<AuthResponse>('auth/login', { username: username, password: password }, 0)
      .subscribe((response: AuthResponse) => {
        if (response.token == null || response.token == '')
          return;

        this.setAuthentication(response.token);
        this._authSubject.next(AuthStatus.Success);
      }, (error: HttpErrorResponse) => {
        switch (error.status) {
          default:
          case 401:
            this.clearAuthentication(AuthStatus.Unauthorized);
            break;
          case 400:
            const response: BadRequestResponse = error.error;
            for(const f of response.fields) {
              if (f.field == 'account' && f.error == 'not_confirmed') {
                this.clearAuthentication(AuthStatus.NotConfirmed);
                return;
              }
            }

            this.clearAuthentication(AuthStatus.InvalidCredentials);
            break;
          case 0:
            this.clearAuthentication(AuthStatus.InternalError);
            break;
        }
      });
  }

  Verify(token: string = null, storeToDisk: boolean = token != null) {
    if (!token)
      token = this._storage.Get(HttpService.STORAGE_TOKEN);

    if (token) {
      this.setAuthentication(token, storeToDisk);
      this.Get('auth/verify', 0)
        .subscribe(() => this._authSubject.next(AuthStatus.Success),
          () => this._authSubject.next(AuthStatus.Unauthorized));
    }
  }

  get Status(): Observable<AuthStatus> {
    return this._authSubject.asObservable();
  }

  SetApi(url: string) {
    if (!this._url && url)
      this._url = url;
  }

  private setAuthentication(token: string, storeToDisk: boolean = true) {
    if (!token)
      return;
    this._options.headers = this._options.headers.set('Authorization', token);

    if (storeToDisk)
      this._storage.Set(HttpService.STORAGE_TOKEN, token);
  }
  private clearAuthentication(status: AuthStatus = AuthStatus.SignedOut) {
    this._options.headers = this._options.headers.delete('Authorization');
    this._storage.Delete(HttpService.STORAGE_TOKEN);
    this._authSubject.next(status);
  }

  private url(uri: string) {
    if (!this._url)
      return null;
    return `${this._url}${uri}`;
  }
}