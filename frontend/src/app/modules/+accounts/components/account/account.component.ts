import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap, takeUntil, switchMap } from 'rxjs/operators';
import { AccountState, IAccount, AccountActions } from 'src/app/core/store';

import { CreatePaymentComponent } from '../../modals';

@Component({
  selector: 'bg-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit, OnDestroy {
  @Input() public account: IAccount;

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

  private currentAccountId: number;
  private destroy$ = new ReplaySubject();

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}

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
}
