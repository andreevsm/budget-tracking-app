import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ACCOUNTS_API, PAYMENTS_API } from '../../constants';

import { IAccount, INewAccount } from './account.interface';
import { ACCOUNTS } from './account.mock';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  public loadAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(ACCOUNTS_API);
  }

  public loadAccountById(id: number): Observable<IAccount | null> {
    return this.http.get<IAccount | null>(`${ACCOUNTS_API}/${id}`);
  }

  public loadPayments(accountId: number): Observable<any> {
    return this.http
      .get(PAYMENTS_API, {
        params: {
          accountId: accountId.toString(),
        },
      })
      .pipe(tap((data) => console.log('data', data)));
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
