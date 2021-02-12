import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TRANSACTIONS_API } from '@core/constants';

import { INewTransaction, ITransaction } from './transaction.interface';

@Injectable()
export class TransactionService {
  constructor(private http: HttpClient) {}

  public getTransactions(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(TRANSACTIONS_API);
  }

  public addTransaction(transaction: INewTransaction): Observable<ITransaction> {
    return this.http.post<ITransaction>(TRANSACTIONS_API, transaction);
  }

  public deleteTransaction(id: number): Observable<number> {
    return this.http.delete<number>(`${TRANSACTIONS_API}/${id}`);
  }
}
