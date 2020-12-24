import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { take } from 'rxjs/operators';
import { INewPayment, AccountActions } from 'src/app/core/store';

@Component({
  selector: 'bg-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePaymentComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.form.getRawValue());
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
    };

    this.store.dispatch(new AccountActions.AddPayment(1, payment));
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
