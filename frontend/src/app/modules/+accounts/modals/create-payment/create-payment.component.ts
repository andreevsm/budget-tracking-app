import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { INewPayment, AccountActions } from 'src/app/core/store';

@Component({
  selector: 'bg-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePaymentComponent implements OnInit {
  public form: FormGroup;

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
    const { category, amount, currency, type, categoryColor } = this.form.getRawValue();

    const payment: INewPayment = {
      category: {
        id: 4,
        name: category,
        color: categoryColor,
      },
      amount,
      currency,
      type,
      createdAt: new Date(),
    };

    this.store.dispatch(new AccountActions.AddPayment(this.data.accountId, payment));
  }

  private buildForm(): void {
    this.form = this.fb.group({
      category: ['', [Validators.required]],
      categoryColor: ['', [Validators.required]],
      description: [''],
      currency: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }
}
