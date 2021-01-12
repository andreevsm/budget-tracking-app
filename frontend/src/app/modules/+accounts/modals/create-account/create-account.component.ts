import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountActions, AccountState, ICurrency, INewAccount } from 'src/app/core/store';
import { parseDateToString } from 'src/app/utils';

@Component({
  selector: 'bg-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent implements OnInit {
  @Select(AccountState.currencies) public currencies$: Observable<Record<number, ICurrency>>;

  public form: FormGroup;
  public Object = Object;

  constructor(private fb: FormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(event: Event): void {
    event.preventDefault();

    const { name, description, currencyId, amount } = this.form.getRawValue();
    const account: INewAccount = {
      name,
      description,
      currencyId,
      createdAt: parseDateToString(new Date()),
      amount,
    };

    this.store.dispatch(new AccountActions.Create(account));
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
      name: ['', [Validators.required]],
      description: [''],
      currencyId: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }
}
