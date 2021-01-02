import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { AccountState, IAccount } from 'src/app/core/store';

@Component({
  selector: 'bg-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountContainerComponent implements OnInit {
  @Select(AccountState.accounts) public accounts$: Observable<IAccount[]>;
  public currentAccount$: Observable<IAccount>;
  private currentAccountId: number;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.subscribeToRoute();
  }

  private subscribeToRoute(): void {
    this.currentAccount$ = this.activatedRoute.params.pipe(
      tap(({ id }) => {
        this.currentAccountId = id;
      }),
      switchMap(({ id }) =>
        this.accounts$.pipe(
          map((accounts) => accounts.find((account) => account.id === +id) as IAccount),
        ),
      ),
    );
  }
}
