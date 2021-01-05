import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AccountActions, INewAccount } from 'src/app/core/store';
import { parseDateToString } from 'src/app/utils';

@Component({
  selector: 'bg-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(event: Event): void {
    event.preventDefault();

    const { name, description, currency } = this.form.getRawValue();
    const account: INewAccount = {
      name,
      description,
      currency,
      createdAt: parseDateToString(new Date()),
    };

    this.store.dispatch(new AccountActions.Create(account));
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['Мой счет 4', [Validators.required]],
      description: ['Пример'],
      currency: ['RUB', [Validators.required]],
    });
  }
}
