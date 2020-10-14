import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap, finalize } from 'rxjs/operators';

import { UIActions } from '../ui';

import { ExpansesActions } from './expanses.actions';
import { IExpense } from './expanses.interface';
import { ExpansesService } from './expanses.service';

interface IExpansesState {
  expanses: IExpense[];
}

@State<IExpansesState>({
  name: 'expanses',
  defaults: {
    expanses: [],
  },
})
@Injectable()
export class ExpansesState {
  constructor(private expansesService: ExpansesService, private store: Store) {}

  @Selector()
  public static expanses(state: IExpansesState): IExpense[] {
    return state.expanses;
  }

  @Action(ExpansesActions.LoadAll)
  public loadAll({ setState, getState }: StateContext<IExpansesState>): Observable<IExpense[]> {
    this.store.dispatch(new UIActions.ShowSpinner());
    const expansesState = getState();

    return this.expansesService.loadAll(expansesState.expanses).pipe(
      tap((expanses) =>
        setState({
          ...getState(),
          expanses,
        }),
      ),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }

  @Action(ExpansesActions.Add)
  public addExpense(
    { setState, getState }: StateContext<IExpansesState>,
    { expense }: ExpansesActions.Add,
  ): Observable<IExpense[]> {
    this.store.dispatch(new UIActions.ShowSpinner());
    const currentExpanses = getState();

    return this.expansesService.add(currentExpanses.expanses, expense).pipe(
      tap((expanses) => {
        return setState({
          ...getState(),
          expanses,
        });
      }),
      finalize(() => this.store.dispatch(new UIActions.HideSpinner())),
    );
  }
}
