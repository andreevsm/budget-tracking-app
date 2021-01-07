import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  INewPayment,
  AccountActions,
  AccountState,
  ICategory,
  ICurrency,
} from 'src/app/core/store';
import { parseDateToString } from 'src/app/utils';

@Component({
  selector: 'bg-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePaymentComponent implements OnInit {
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;
  @Select(AccountState.currencies) public currencies$: Observable<Record<number, ICurrency>>;

  public form: FormGroup;
  public Object = Object;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { accountId: number },
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    const { categoryId, amount, currencyId, operationType } = this.form.getRawValue();

    const payment: INewPayment = {
      accountId: this.data.accountId,
      categoryId,
      amount,
      currencyId,
      operationType,
      createdAt: parseDateToString(new Date()),
    };

    console.log(payment);

    this.store.dispatch(new AccountActions.AddPayment(payment));
  }

  public onCategoryChange(item: MatSelectChange): void {
    this.form.patchValue(
      {
        categoryId: item.value,
      },
      { emitEvent: false },
    );
  }

  public onCurrencyChange(item: MatSelectChange): void {
    this.form.patchValue(
      {
        currencyId: item.value,
      },
      { emitEvent: false },
    );
  }

  private buildForm(): void {
    this.form = this.fb.group({
      categoryId: [null, [Validators.required]],
      description: [''],
      currencyId: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      operationType: ['', [Validators.required]],
    });
  }
}
