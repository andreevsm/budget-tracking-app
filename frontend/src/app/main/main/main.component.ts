import { Store, Select } from '@ngxs/store';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';

import { AccountState, AccountActions, IAccount } from '../models';
import { EditAccountComponent } from '../modals/edit-account/edit-account.component';

@Component({
  selector: 'bg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;

  public buttons = [
    {
      icon: 'edit',
      click: (account: IAccount): void => this.onEditAccount(account),
    },
    {
      icon: 'remove_red_eye',
      click: (account: IAccount): void => this.onViewAccount(account),
    },
    {
      icon: 'delete',
      click: (account: IAccount): void => this.onDeleteAccount(account),
    },
  ];

  public menuButtons = [
    {
      text: 'Перевести',
      click: (): void => this.onSendMoney(),
    },
    {
      text: 'Оплатить',
      click: (): void => this.onPay(),
    },
    {
      text: 'Пополнить ',
      click: (): void => this.onFillAccount(),
    },
    {
      text: 'Создать счет',
      click: (): void => this.onCreateAccount(),
    },
  ];

  private destroy$ = new ReplaySubject();

  constructor(private store: Store, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.store.dispatch(new AccountActions.LoadAll());
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onEditAccount(account: IAccount): void {
    this.dialog
      .open(EditAccountComponent, {
        data: account,
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        console.log('result', result);
      });
  }

  private onViewAccount(account: IAccount): void {
    console.log('view', account);
  }

  private onDeleteAccount(account: IAccount): void {
    this.store.dispatch(new AccountActions.Delete(account.id));
  }

  private onSendMoney(): void {
    console.log('send money');
  }

  private onPay(): void {
    console.log('pay');
  }

  private onFillAccount(): void {
    console.log('fill account');
  }

  private onCreateAccount(): void {
    console.log('create account');
    this.dialog
      .open(EditAccountComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        console.log('result', result);
      });
  }
}
