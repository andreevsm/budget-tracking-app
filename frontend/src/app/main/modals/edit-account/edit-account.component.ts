import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IAccount } from '../../models';

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
  ) {}

  public ngOnInit(): void {
    this.buildForm();
    console.log('data', this.data);
    // this.form;
  }

  private buildForm(): void {
    const {
      name = '',
      description = '',
      type = null,
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
