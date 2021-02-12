import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { AccountActions, IAccount, ICurrency, INewAccount } from '@core/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { CurrencyState } from '@core/store/currency';

@Component({
  selector: 'bg-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent implements OnInit {
  @Select(CurrencyState.currencies) public currencies$: Observable<Record<number, ICurrency>>;

  public form: FormGroup;
  public Object = Object;
  public currencyControl = new FormControl(null, [Validators.required]);

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public account?: IAccount,
  ) {}

  public ngOnInit(): void {
    this.buildForm();
    this.subscribeToCurrency();
  }

  public onSubmit(): void {
    const { name, description, currencyId, amount } = this.form.getRawValue();

    const account: IAccount | INewAccount = this.account?.id
      ? {
          id: this.account.id,
          name,
          description,
          currencyId,
          createdAt: new Date(),
          amount,
        }
      : {
          name,
          description,
          currencyId,
          createdAt: new Date(),
          amount,
        };

    if (this.account?.id) {
      this.store.dispatch(new AccountActions.Update(account as IAccount));
    } else {
      this.store.dispatch(new AccountActions.Create(account));
    }
  }

  private subscribeToCurrency(): void {
    this.currencyControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.form.patchValue(
        {
          currencyId: value,
        },
        { emitEvent: false },
      );
    });
  }

  private buildForm(): void {
    const { name, description, currencyId, amount } = this.account || {};

    this.currencyControl.setValue(currencyId, { emitEvent: false });

    this.form = this.fb.group({
      name: [name || '', [Validators.required]],
      description: [description || ''],
      currencyId: [currencyId || null, [Validators.required]],
      amount: [amount || null, [Validators.required]],
    });
  }
}
