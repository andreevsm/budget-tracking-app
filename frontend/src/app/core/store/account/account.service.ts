import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ACCOUNTS_API, CATEGORIES_API, CURRENCIES_API } from '../../constants';

import { IAccount, ICategory, ICurrency, INewAccount, INewCategory } from './account.interface';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  public loadAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(ACCOUNTS_API);
  }

  public loadAccountById(id: number): Observable<IAccount | null> {
    return this.http.get<IAccount | null>(`${ACCOUNTS_API}/${id}`);
  }

  public deleteAccount(id: number): Observable<number> {
    return this.http.delete<number>(`${ACCOUNTS_API}/${id}`);
  }

  public loadCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(CATEGORIES_API);
  }

  public loadCurrencies(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(CURRENCIES_API);
  }

  public createAccount(account: INewAccount): Observable<IAccount> {
    return this.http.post<IAccount>(ACCOUNTS_API, account);
  }

  public updateAccount(account: IAccount): Observable<number> {
    return this.http.put<number>(ACCOUNTS_API, account);
  }

  public addCategory(category: INewCategory): Observable<ICategory> {
    return this.http.post<ICategory>(CATEGORIES_API, category);
  }
}
