import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LOGIN_API } from '../../constants';
import { LocalStorage } from '../../services/local-storage.service';

import { IRequestUser, IResponseUser, IUser } from './auth.interface';

const ACCESS_TOKEN = 'access_token';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private localStorage: LocalStorage) {}

  public login(payload: IRequestUser): Observable<IResponseUser | null> {
    console.log('payload', payload);

    return this.http.post(LOGIN_API, payload).pipe(
      tap((response: IResponseUser) => {
        const { token } = response;

        if (token !== null) {
          this.setToken(token);
        }
      }),
      map((response: IResponseUser) => {
        if (response !== null) {
          return response;
        }

        return null;
      }),
      catchError(() => throwError('Неверный логин/пароль')),
    );
  }

  public getAccessToken(): string | null {
    return this.localStorage.getItem(ACCESS_TOKEN);
  }

  private setToken(token: string): void {
    this.localStorage.setItem(ACCESS_TOKEN, token);
  }
}
