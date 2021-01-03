import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAccount, AccountActions, ICategory, IPayment } from 'src/app/core/store';
import { NgChanges } from 'src/app/utils';

import { CreatePaymentComponent } from '../../modals';

@Component({
  selector: 'bg-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnChanges, OnInit, OnDestroy {
  @Input() public account: IAccount;
  @Input() public categories: Record<number, ICategory>;

  public buttons = [
    // {
    //   icon: 'edit',
    //   click: (account: IAccount): void => this.onEditAccount(account),
    // },
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
    // {
    //   text: 'Создать счет',
    //   click: (): void => this.onCreateAccount(),
    // },
  ];

  public form: FormGroup;
  public todayPayments: IPayment[] = [];
  public yesterdayPayments: IPayment[] = [];

  private currentAccountId: number;
  private destroy$ = new ReplaySubject();

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnChanges(changes: NgChanges<AccountComponent>): void {
    console.log('account', this.account);

    if (changes.account) {
      this.preparePayments();
    }
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    console.log('form', this.form.value);
    // this.store.dispatch(new ExpansesActions.Add(this.form.value));
    this.form.get('amount')?.reset();
    this.form.get('categoryId')?.reset();
  }

  public onAddItem(): void {
    this.dialog
      .open(CreatePaymentComponent, {
        data: {
          accountId: this.currentAccountId,
        },
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

  private buildForm(): void {
    this.form = this.fb.group({
      date: [new Date(), [Validators.required]],
      amount: [null, [Validators.required]],
      categoryId: [null],
      balanceId: [null],
    });
  }

  private preparePayments(): void {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    console.log('date', date.toUTCString());

    this.todayPayments = this.account.payments.filter(
      (payment) => new Date(payment.createdAt).getDate() === date.getDate(),
    );

    console.log('todayPayments', this.todayPayments);

    date.setDate(date.getDate() - 1);

    new Date();
    this.yesterdayPayments = this.account.payments.filter(
      (payment) => new Date(payment.createdAt).getDate() === date.getDate(),
    );
    console.log('yesterdayPayments', this.yesterdayPayments);

    this.cdr.markForCheck();
  }
}
