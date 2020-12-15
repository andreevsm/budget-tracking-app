import {Store, Select} from '@ngxs/store';
import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ExpansesState, IExpense, ExpansesActions} from '../../core/store';
import {AccountState, AccountActions, IAccount} from '../models';
import {EditAccountComponent} from '../modals/edit-account/edit-account.component';

@Component({
  selector: 'bg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;
  @Select(ExpansesState.expanses) public expanses$: Observable<IExpense[]>;

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
    // {
    //   text: 'Создать счет',
    //   click: (): void => this.onSendMoney(),
    // },
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

  public form: FormGroup;

  public categories = [
    {
      id: 1,
      name: 'Домашний интернет',
    },
    {
      id: 2,
      name: 'Продукты',
    },
    {
      id: 3,
      name: 'Транспорт',
    },
  ];

  public balances = [
    {
      id: 1,
      name: 'Расходы',
    },
    {
      id: 2,
      name: 'Доходы',
    },
  ];

  private destroy$ = new ReplaySubject();

  constructor(private store: Store, private dialog: MatDialog, private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new AccountActions.LoadAll());

    this.buildForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    console.log('form', this.form.value);
    this.store.dispatch(new ExpansesActions.Add(this.form.value));
    this.form.get('amount')?.reset();
    this.form.get('categoryId')?.reset();
  }

  private onEditAccount(account: IAccount): void {
    this.dialog
      .open(EditAccountComponent, {
        data: account,
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
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
    this.dialog
      .open(EditAccountComponent, {
        data: {},
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      date: [new Date(), [Validators.required]],
      amount: [null, [Validators.required]],
      categoryId: [null],
      balanceId: [null],
    });
  }
}
