import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LOGIN_API, LOGOUT_API, SIGN_UP_API } from '../../constants';
import { LocalStorage } from '../../services/local-storage.service';

import { IRequestNewUser, IRequestUser, IResponseUser } from './auth.interface';

const ACCESS_TOKEN = 'access_token';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage,
    private router: Router,
  ) {}

  public login(payload: IRequestUser): Observable<IResponseUser | null> {
    return this.http.post(LOGIN_API, payload).pipe(
      tap((response: IResponseUser) => {
        const { token } = response;

        if (token !== null) {
          this.setToken(token);
        }
      }),
      map((response: IResponseUser) => {
        if (response !== null) {
          this.router.navigate(['/']);
          return response;
        }

        return null;
      }),
      catchError(() => throwError('Неверный логин/пароль')),
    );
  }

  public signUp(payload: IRequestNewUser): Observable<IResponseUser | null> {
    return this.http.post(SIGN_UP_API, payload).pipe(
      tap((response: IResponseUser) => {
        const { token } = response;

        if (token !== null) {
          this.setToken(token);
        }
      }),
      map((response: IResponseUser) => {
        if (response !== null) {
          this.router.navigate(['/']);
          return response;
        }

        return null;
      }),
      catchError(() => throwError('Неверный логин/пароль')),
    );
  }

  public logout(): Observable<boolean> {
    return this.http
      .post<boolean>(LOGOUT_API, {})
      .pipe(catchError(() => throwError('Неверный логин/пароль')));
  }

  public getAccessToken(): string | null {
    return this.localStorage.getItem(ACCESS_TOKEN);
  }

  public navigateToLogin(): void {
    this.router.navigate(['/signin']);
  }

  public clearStorage(): void {
    this.localStorage.clear();
  }

  private setToken(token: string): void {
    this.localStorage.setItem(ACCESS_TOKEN, token);
  }
}
