import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AccountService, AccountState, IAccount, ICategory } from 'src/app/core/store';

@Component({
  selector: 'bg-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountContainerComponent implements OnInit {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;

  public currentAccount$: Observable<IAccount>;

  constructor(private activatedRoute: ActivatedRoute, private accountService: AccountService) {}

  public ngOnInit(): void {
    this.subscribeToRoute();
  }

  private subscribeToRoute(): void {
    this.currentAccount$ = this.activatedRoute.params.pipe(
      switchMap(({ id }) =>
        forkJoin([
          this.accountService.loadAccountById(id),
          this.accountService.loadPayments(id),
        ]).pipe(
          map(([account, payments]) => ({
            ...account,
            payments,
          })),
        ),
      ),
    );
  }
}
