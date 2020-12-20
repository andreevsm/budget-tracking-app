import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IRequestUser, IUser } from './auth.interface';

@Injectable()
export class AuthService {
  public login(payload: IRequestUser): Observable<IUser> {
    console.log('payload', payload);

    return of({
      id: 1,
      email: 'aandreev.sm@gmail.com',
      login: 'andreevsm',
      role: 'user',
      status: 'active',
    });
  }
}
