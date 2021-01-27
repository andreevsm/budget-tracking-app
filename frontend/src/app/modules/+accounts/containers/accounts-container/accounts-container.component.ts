import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  AccountActions,
  AccountState,
  IAccount,
  ICategory,
  ICurrency,
  ITransaction,
  TransactionState,
} from '@core/store';

import { CreateAccountComponent, CreateCategoryComponent } from '../../modals';

@Component({
  selector: 'bg-accounts-container',
  templateUrl: './accounts-container.component.html',
  styleUrls: ['./accounts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsContainerComponent implements OnInit, OnDestroy {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;
  @Select(AccountState.accountsEntity) public accountsEntity$: Observable<Record<number, IAccount>>;
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;
  @Select(AccountState.categoriesList) public categoriesList$: Observable<ICategory[]>;
  @Select(AccountState.currencies) public currencies$: Observable<Record<number, ICurrency>>;
  @Select(TransactionState.transactions) public transactions$: Observable<ITransaction[]>;

  public accounts: IAccount[] = [];
  public transactions: ITransaction[] = [];
  public currencies: Record<number, ICurrency> = {};

  private destroy$ = new Subject();

  constructor(private dialog: MatDialog, private store: Store, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.subscribeToAccounts();
    this.subscribeToTransactions();
    this.subscribeToCurrencies();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getAmountByAccountId(id: number) {
    const accountAmount = this.accounts.find((account) => account.id === id)?.amount || 0;

    return this.transactions
      .filter((transaction) => [transaction.accountIncome, transaction.accountOutcome].includes(id))
      .reduce((prev, curr) => {
        if (curr.accountIncome === curr.accountOutcome) {
          return prev + curr.income + curr.outcome;
        }

        if (curr.accountIncome === id && curr.accountOutcome !== id) {
          return prev + curr.income;
        }

        if (curr.accountIncome !== id && curr.accountOutcome === id) {
          return prev + curr.outcome;
        }

        return prev;
      }, accountAmount);
  }

  public onAddAccount(): void {
    this.dialog
      .open(CreateAccountComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  public onEditAccount(account: IAccount): void {
    this.dialog
      .open(CreateAccountComponent, {
        data: account,
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  public onAddCategory(): void {
    this.dialog
      .open(CreateCategoryComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  public onDeleteAccount(id: number): void {
    this.store.dispatch(new AccountActions.Delete(id));
  }

  public onDeleteCategory(id: number): void {
    this.store.dispatch(new AccountActions.DeleteCategory(id));
  }

  private subscribeToAccounts(): void {
    this.accounts$.pipe(takeUntil(this.destroy$)).subscribe((accounts) => {
      this.accounts = accounts;
      this.cdr.markForCheck();
    });
  }

  private subscribeToTransactions(): void {
    this.transactions$.pipe(takeUntil(this.destroy$)).subscribe((transactions) => {
      this.transactions = transactions;
      this.cdr.markForCheck();
    });
  }

  private subscribeToCurrencies(): void {
    this.currencies$.pipe(takeUntil(this.destroy$)).subscribe((currencies) => {
      this.currencies = currencies;
      this.cdr.markForCheck();
    });
  }
}
