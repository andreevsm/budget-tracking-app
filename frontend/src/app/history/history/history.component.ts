import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IExpense, ExpansesActions } from 'src/app/core/store';

import { ExpansesState } from '../../core/store/expanses/expanses.state';

@Component({
  selector: 'bg-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {
  @Select(ExpansesState.expanses) public expanses$: Observable<IExpense[]>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new ExpansesActions.LoadAll());
  }
}
