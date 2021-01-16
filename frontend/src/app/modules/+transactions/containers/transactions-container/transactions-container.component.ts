import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { INewTransaction, ITransaction, TransactionActions, TransactionState } from '../../store';

@Component({
  selector: 'bg-transactions-container',
  templateUrl: './transactions-container.component.html',
  styleUrls: ['./transactions-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsContainerComponent implements OnInit {
  @Select(TransactionState.transactions) public transactions$: Observable<ITransaction[]>;

  constructor(private store: Store) {}

  public ngOnInit(): void {}

  public onTransactionAdd(transaction: INewTransaction): void {
    console.log('transaction', transaction);

    this.store.dispatch(new TransactionActions.Add(transaction));
  }
}
