import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  AccountActions,
  AccountState,
  IAccount,
  ICategory,
  ICurrency,
  INewTransaction,
  ITransaction,
  TransactionActions,
  TransactionState,
} from '@core/store';

@Component({
  selector: 'bg-transactions-container',
  templateUrl: './transactions-container.component.html',
  styleUrls: ['./transactions-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsContainerComponent implements OnInit, OnDestroy {
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;
  @Select(AccountState.accountsEntity) public accountsEntity$: Observable<Record<number, IAccount>>;
  @Select(AccountState.currencies) public currencies$: Observable<Record<number, ICurrency>>;
  @Select(TransactionState.transactions) public transactions$: Observable<ITransaction[]>;

  public initialtransactions: ITransaction[] = [];
  public transactions: ITransaction[] = [];

  private destroy$ = new Subject();

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.store.dispatch(new AccountActions.LoadCategories(1));
    this.store.dispatch(new TransactionActions.LoadAll());

    this.subscribeToTransactions();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onTransactionAdd(transaction: INewTransaction): void {
    this.store.dispatch(new TransactionActions.Add(transaction));
  }

  public onFilterChange(accountsIds: number[]): void {
    if (accountsIds.length > 0) {
      this.transactions = this.initialtransactions.filter(
        (transaction) =>
          accountsIds.includes(transaction.accountIncome) ||
          accountsIds.includes(transaction.accountOutcome),
      );
    } else {
      this.transactions = [];
    }

    this.cdr.markForCheck();
  }

  public subscribeToTransactions(): void {
    this.transactions$.pipe(takeUntil(this.destroy$)).subscribe((transactions) => {
      this.initialtransactions = transactions;
      this.transactions = transactions;
      this.cdr.markForCheck();
    });
  }

  public onDeleteTransaction(id: number): void {
    this.store.dispatch(new TransactionActions.Delete(id));
  }
}
