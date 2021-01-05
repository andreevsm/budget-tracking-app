import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ACCOUNTS_API, CATEGORIES_API, PAYMENTS_API } from '../../constants';

import { IAccount, ICategory, INewAccount, IPayment } from './account.interface';
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

  public loadPayments(accountId: number): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(PAYMENTS_API, {
      params: {
        accountId: accountId.toString(),
      },
    });
  }

  public loadCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(CATEGORIES_API);
  }

  public deleteAccount(id: number): Observable<IAccount[]> {
    return of(ACCOUNTS.filter((account) => account.id !== id)).pipe(delay(300));
  }

  public createAccount(account: INewAccount): Observable<number> {
    return this.http.post<number>(ACCOUNTS_API, account);
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
