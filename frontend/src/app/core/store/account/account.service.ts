import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ACCOUNTS_API, CATEGORIES_API, CURRENCIES_API, PAYMENTS_API } from '../../constants';

import {
  IAccount,
  ICategory,
  ICurrency,
  INewAccount,
  INewCategory,
  INewPayment,
  IPayment,
} from './account.interface';

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

  public loadCurrencies(): Observable<ICurrency[]> {
    return this.http.get<ICategory[]>(CURRENCIES_API);
  }

  public createAccount(account: INewAccount): Observable<number> {
    return this.http.post<number>(ACCOUNTS_API, account);
  }

  public addPayment(payment: INewPayment): Observable<number> {
    return this.http.post<number>(PAYMENTS_API, payment);
  }

  public addCategory(category: INewCategory): Observable<number> {
    return this.http.post<number>(CATEGORIES_API, category);
  }
}
