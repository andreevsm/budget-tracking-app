import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AccountState, IAccount } from 'src/app/core/store';

@Component({
  selector: 'bg-accounts-container',
  templateUrl: './accounts-container.component.html',
  styleUrls: ['./accounts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsContainerComponent implements OnInit, OnDestroy {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;

  private destroy$ = new Subject();

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.subscribeToAccounts();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToAccounts(): void {
    this.accounts$
      .pipe(
        filter((accounts) => accounts?.length > 0),
        takeUntil(this.destroy$),
      )
      .subscribe((accounts) => {
        this.router.navigate(['/accounts', accounts[0].id]);
      });
  }
}
