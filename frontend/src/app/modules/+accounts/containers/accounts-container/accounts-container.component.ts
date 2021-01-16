import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountState, IAccount } from 'src/app/core/store';

import { CreateAccountComponent, CreateCategoryComponent } from '../../modals';

@Component({
  selector: 'bg-accounts-container',
  templateUrl: './accounts-container.component.html',
  styleUrls: ['./accounts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsContainerComponent implements OnInit, OnDestroy {
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

  public onAddCategory(): void {
    this.dialog
      .open(CreateCategoryComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private subscribeToAccounts(): void {
    // this.accounts$
    //   .pipe(
    //     filter((accounts) => accounts?.length > 0),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe((accounts) => {
    //     this.router.navigate(['/accounts', accounts[0].id]);
    //   });
  }
}
