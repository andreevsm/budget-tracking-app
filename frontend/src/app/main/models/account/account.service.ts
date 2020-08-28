import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { IAccount } from './account.interface';
import { ACCOUNTS } from './account.mock';

Injectable();
export class AccountService {
  public loadAccounts(): Observable<IAccount[]> {
    return of(ACCOUNTS).pipe(delay(300));
  }

  public deleteAccount(id: number): Observable<IAccount[]> {
    return of(ACCOUNTS.filter((account) => account.id !== id)).pipe(delay(300));
  }
}