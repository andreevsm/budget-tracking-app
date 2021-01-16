import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { IAccount, ICategory } from 'src/app/core/store';
import { parseDateToString } from 'src/app/utils';

import { INewTransaction } from '../../store';

@Component({
  selector: 'bg-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent implements OnInit {
  @Input() public categories: ICategory[] = [];
  @Input() public accounts: IAccount[] = [];

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

  public onSubmit(): void {
    const { accountIncome, accountOutcome, income, outcome, comment } = this.form.getRawValue();

    this.addTransaction.emit({
      accountIncome,
      accountOutcome: accountOutcome || accountIncome,
      income: income ?? 0,
      outcome: outcome ?? 0,
      comment,
      createdAt: parseDateToString(new Date()),
    });
  }

  public onCategoryChange(item: MatSelectChange): void {
    console.log('item', item);
  }

  public onAccountIncomeChange(item: MatSelectChange): void {
    console.log('item', item);
    this.form.patchValue(
      {
        accountIncome: item.value,
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
    });
  }
}
