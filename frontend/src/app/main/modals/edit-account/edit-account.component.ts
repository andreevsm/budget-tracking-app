import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'bg-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAccountComponent {
  constructor(public dialogRef: MatDialogRef<EditAccountComponent>) {}
}
