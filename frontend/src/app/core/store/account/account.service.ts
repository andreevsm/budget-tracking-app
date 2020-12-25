import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { IAccount, INewAccount } from './account.interface';
import { ACCOUNTS } from './account.mock';

@Injectable()
export class AccountService {
  public loadAccounts(): Observable<IAccount[]> {
    return of(ACCOUNTS).pipe(delay(300));
  }

  public deleteAccount(id: number): Observable<IAccount[]> {
    return of(ACCOUNTS.filter((account) => account.id !== id)).pipe(delay(300));
  }

  public createAccount(account: INewAccount): Observable<IAccount[]> {
    ACCOUNTS.push({
      ...account,
      id: ACCOUNTS.length + 1,
      payments: [],
    });
    return of([...ACCOUNTS]).pipe(delay(300));
  }

  public editAccount(editedAccount: IAccount): Observable<IAccount[]> {
    const editedAccountIndex = ACCOUNTS.findIndex((account) => account.id === editedAccount.id);

    return of([
      ...ACCOUNTS.slice(0, editedAccountIndex),
      editedAccount,
      ...ACCOUNTS.slice(editedAccountIndex + 1),
    ]).pipe(delay(300));
  }
}
