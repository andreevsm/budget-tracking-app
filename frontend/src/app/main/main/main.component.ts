import { Store, Select } from '@ngxs/store';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountState, AccountActions, IAccount } from '../models';
import { EditAccountComponent } from '../modals/edit-account/edit-account.component';
import { PaymentState } from '../models/payment/payment.state';
import { IPayment } from '../models/payment/payment.interface';
import { PaymentActions } from '../models/payment/payment.action';

@Component({
  selector: 'bg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;
  @Select(PaymentState.payments) public payments$: Observable<IPayment[]>;

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

  private destroy$ = new ReplaySubject();

  constructor(private store: Store, private dialog: MatDialog, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.store.dispatch(new AccountActions.LoadAll());
    this.store.dispatch(new PaymentActions.LoadAll());

    this.buildForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    console.log('form', this.form.value);
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
      category: [null],
    });
  }
}
