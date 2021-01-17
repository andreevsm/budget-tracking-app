import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TransactionActions } from './transaction.actions';
import { ITransaction } from './transaction.interface';
import { TransactionService } from './transaction.service';

export interface ITransactionState {
  transactions: ITransaction[];
}

@State<ITransactionState>({
  name: 'transaction',
  defaults: {
    transactions: [],
  },
})
@Injectable()
export class TransactionState {
  constructor(private transactionService: TransactionService, private store: Store) {}

  @Selector()
  public static transactions(state: ITransactionState): ITransaction[] {
    return state.transactions;
  }

  @Action(TransactionActions.LoadAll)
  public loadAll({
    setState,
    getState,
  }: StateContext<ITransactionState>): Observable<ITransaction[]> {
    return this.transactionService.getTransactions().pipe(
      tap((transactions) =>
        setState({
          ...getState(),
          transactions,
        }),
      ),
    );
  }

  @Action(TransactionActions.Add)
  public add(
    { setState, getState }: StateContext<ITransactionState>,
    { transaction }: TransactionActions.Add,
  ): Observable<number> {
    return this.transactionService.addTransaction(transaction);
  }

  @Action(TransactionActions.Delete)
  public delete(
    { setState, getState }: StateContext<ITransactionState>,
    { id }: TransactionActions.Delete,
  ): Observable<number> {
    return this.transactionService.deleteTransaction(id);
  }
}
