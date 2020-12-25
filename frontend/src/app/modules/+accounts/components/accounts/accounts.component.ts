import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CreateAccountComponent } from '../../modals/create-account/create-account.component';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent implements OnDestroy {
  private destroy$ = new Subject();

  constructor(private dialog: MatDialog) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onAddAccount(): void {
    this.dialog
      .open(CreateAccountComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
