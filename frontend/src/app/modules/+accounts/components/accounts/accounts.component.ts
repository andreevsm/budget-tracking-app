import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AccountState, IAccount } from 'src/app/core/store';

import { CreateAccountComponent } from '../../modals/create-account/create-account.component';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent implements OnInit, OnDestroy {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;

  private destroy$ = new Subject();

  constructor(private dialog: MatDialog, private router: Router) {}

  public ngOnInit(): void {
    this.subscribeToAccounts();
  }

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

  private subscribeToAccounts(): void {
    this.accounts$
      .pipe(
        filter((accounts) => accounts.length > 0),
        takeUntil(this.destroy$),
      )
      .subscribe((accounts) => {
        this.router.navigate(['/accounts', accounts[0].id]);
      });
  }
}
