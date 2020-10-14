import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IUser } from './user.interface';

@Injectable()
export class UserService {
  public load(): Observable<IUser> {
    return of({
      id: 1,
      name: 'Сергей',
      email: 'aandreev.sm@gmail.com',
    });
  }
}
