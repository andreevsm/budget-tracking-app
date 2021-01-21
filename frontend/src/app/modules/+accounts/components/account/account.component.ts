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
import { ReplaySubject } from 'rxjs';
import { IAccount, ICategory, ICurrency } from '@core/store';
import { NgChanges } from '@utils/types';

@Component({
  selector: 'bg-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnChanges, OnInit, OnDestroy {
  @Input() public account: IAccount;
  @Input() public categories: Record<number, ICategory>;
  @Input() public currencies: Record<number, ICurrency>;

  public form: FormGroup;
  public todayPayments: any[] = [];
  public yesterdayPayments: any[] = [];

  private destroy$ = new ReplaySubject();

  constructor(private dialog: MatDialog, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  public ngOnChanges(changes: NgChanges<AccountComponent>): void {
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

  public onAddItem(): void {}

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

    // this.todayPayments = this.account.payments.filter(
    //   (payment) => new Date(payment.createdAt).getDate() === date.getDate(),
    // );

    date.setDate(date.getDate() - 1);

    // this.yesterdayPayments = this.account.payments.filter(
    //   (payment) => new Date(payment.createdAt).getDate() === date.getDate(),
    // );

    this.cdr.markForCheck();
  }
}
