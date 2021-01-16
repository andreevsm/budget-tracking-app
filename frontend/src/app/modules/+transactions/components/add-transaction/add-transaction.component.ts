import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountState, ICategory } from 'src/app/core/store';
import { parseDateToString } from 'src/app/utils';

import { INewTransaction } from '../../store';

@Component({
  selector: 'bg-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent implements OnInit {
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;

  @Output() public addTransaction: EventEmitter<INewTransaction> = new EventEmitter();

  public Object = Object;
  public form: FormGroup;
  public isTransactionBlockShown = false;

  public get transactionTypeControl(): AbstractControl {
    return this.form.get('transactionType');
  }

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      transactionType: ['expenses', [Validators.required]],
      accountIncome: [null, [Validators.required]],
      accountOutcome: [null, [Validators.required]],
      income: [null, [Validators.required]],
      outcome: [null, [Validators.required]],
      comment: [''],
    });
  }

  public onSubmit(): void {
    const { accountIncome, accountOutcome, income, outcome, comment } = this.form.getRawValue();

    this.addTransaction.emit({
      accountIncome,
      accountOutcome: accountOutcome || accountIncome,
      income,
      outcome,
      comment,
      createdAt: parseDateToString(new Date()),
    });
  }
}
