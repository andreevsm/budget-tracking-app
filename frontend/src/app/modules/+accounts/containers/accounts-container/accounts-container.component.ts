import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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
export class AccountsContainerComponent implements OnDestroy {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;
  @Select(AccountState.accountsEntity) public accountsEntity$: Observable<Record<number, IAccount>>;
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;
  @Select(AccountState.categoriesList) public categoriesList$: Observable<ICategory[]>;
  @Select(AccountState.currencies) public currencies$: Observable<ICurrency[]>;
  @Select(TransactionState.transactions) public transactions$: Observable<ITransaction[]>;

  private destroy$ = new Subject();

  constructor(private dialog: MatDialog, private store: Store) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
}
