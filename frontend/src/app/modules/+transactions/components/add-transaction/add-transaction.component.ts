import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';
import { IAccount, ICategory, ICurrency, INewTransaction } from '@core/store';
import { parseDateToString } from '@utils/helpers';

@Component({
  selector: 'bg-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent implements OnInit, OnDestroy {
  @Input() public categories: ICategory[] = [];
  @Input() public accounts: IAccount[] = [];
  @Input() public currencies: Record<number, ICurrency> = {};

  @Output() public addTransaction = new EventEmitter<INewTransaction>();

  public Object = Object;
  public form: FormGroup;
  public isTransactionBlockShown = false;

  private destroy$ = new Subject();

  public get transactionTypeControl(): AbstractControl {
    return this.form.get('transactionType');
  }

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    const {
      transactionType,
      accountIncome,
      accountOutcome,
      income,
      outcome,
      comment,
      categoryId,
      createdAt,
    } = this.form.getRawValue();

    const patchedIncome = transactionType === 'incomes' ? income : 0;
    const patchedOutcome = transactionType === 'expenses' ? -outcome : 0;

    this.addTransaction.emit({
      accountIncome,
      accountOutcome: accountOutcome || accountIncome,
      income: patchedIncome,
      outcome: patchedOutcome,
      comment,
      createdAt: parseDateToString(new Date(createdAt)),
      categoryId,
    });
  }

  public onCategoryChange(item: MatSelectChange): void {
    this.form.patchValue(
      {
        categoryId: item.value,
      },
      { emitEvent: false },
    );
  }

  public onAccountChange(item: MatSelectChange): void {
    this.form.patchValue(
      {
        accountOutcome: item.value.id,
        accountIncome: item.value.id,
      },
      { emitEvent: false },
    );
  }

  public onAccountIncomeChange(item: MatSelectChange): void {
    this.form.patchValue(
      {
        accountIncome: item.value.id,
      },
      { emitEvent: false },
    );
  }

  public onAccountOutcomeChange(item: MatSelectChange): void {
    this.form.patchValue(
      {
        accountOutcome: item.value.id,
      },
      { emitEvent: false },
    );
  }

  private buildForm(): void {
    this.form = this.fb.group({
      transactionType: ['expenses', [Validators.required]],
      accountIncome: [null, [Validators.required]],
      accountOutcome: [null, [Validators.required]],
      income: [null, [Validators.required]],
      outcome: [null, [Validators.required]],
      comment: [''],
      categoryId: [null, [Validators.required]],
      createdAt: [new Date(), [Validators.required]],
    });
  }
}
