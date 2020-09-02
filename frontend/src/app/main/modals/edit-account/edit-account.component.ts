import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { IAccount, AccountActions } from '../../models';

@Component({
  selector: 'bg-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAccountComponent implements OnInit {
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IAccount,
    private formBuilder: FormBuilder,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.buildForm();
    console.log('data', this.data);
    // this.form;
  }

  public onSubmitForm(): void {
    console.log('form 2', this.form.value);

    this.store.dispatch(new AccountActions.Create(this.form.value));
  }

  private buildForm(): void {
    const {
      name = '',
      description = '',
      type = 0,
      currency = 'RUB',
      accountNumber = null,
      createdAt = null,
    } = this.data;

    this.form = this.formBuilder.group({
      name: [name, Validators.required],
      description: [description],
      type: [type],
      currency: [currency, Validators.required],
      accountNumber: [
        {
          value: accountNumber,
          disabled: true,
        },
      ],
      createdAt: [
        {
          value: createdAt,
          disabled: true,
        },
      ],
    });
  }
}
