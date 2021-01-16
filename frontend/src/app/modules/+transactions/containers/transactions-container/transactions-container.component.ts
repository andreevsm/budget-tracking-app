import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountActions, AccountState, IAccount, ICategory, ICurrency } from 'src/app/core/store';

import { INewTransaction, ITransaction, TransactionActions, TransactionState } from '../../store';

@Component({
  selector: 'bg-transactions-container',
  templateUrl: './transactions-container.component.html',
  styleUrls: ['./transactions-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsContainerComponent implements OnInit {
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;
  @Select(AccountState.currencies) public currencies$: Observable<Record<number, ICurrency>>;
  @Select(TransactionState.transactions) public transactions$: Observable<ITransaction[]>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new AccountActions.LoadCategories(1));
    this.store.dispatch(new TransactionActions.LoadAll());
  }

  public onTransactionAdd(transaction: INewTransaction): void {
    console.log('transaction', transaction);

    this.store.dispatch(new TransactionActions.Add(transaction));
  }

  public onFilterChange(accountsIds: number[]): void {
    console.log(accountsIds);
  }
}
