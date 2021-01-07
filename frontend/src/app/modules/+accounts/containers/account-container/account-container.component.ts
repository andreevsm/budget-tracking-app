import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import {
  AccountActions,
  AccountService,
  AccountState,
  IAccount,
  ICategory,
  ICurrency,
} from 'src/app/core/store';

@Component({
  selector: 'bg-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountContainerComponent implements OnInit {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;
  @Select(AccountState.categories) public categories$: Observable<Record<number, ICategory>>;
  @Select(AccountState.currencies) public currencies$: Observable<Record<number, ICurrency>>;

  public currentAccount$: Observable<IAccount>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.subscribeToRoute();
  }

  private subscribeToRoute(): void {
    // TODO: сделать через стор
    this.currentAccount$ = this.activatedRoute.params.pipe(
      tap(({ id }) => {
        this.store.dispatch(new AccountActions.LoadCategories(id));
      }),
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
