import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TRANSACTIONS_API } from 'src/app/core/constants';

import { INewTransaction, ITransaction } from './transaction.interface';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private http: HttpClient) {}

  public getTransactions(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(TRANSACTIONS_API);
  }

  public addTransaction(transaction: INewTransaction): Observable<number> {
    return this.http.post<number>(TRANSACTIONS_API, transaction);
  }
}
