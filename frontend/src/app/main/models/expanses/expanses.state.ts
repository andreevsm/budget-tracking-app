import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { CoreActions } from 'src/app/core/store';
import { tap, finalize } from 'rxjs/operators';

import { ExpansesActions } from './expanses.actions';
import { IExpense } from './expanses.interface';
import { ExpansesService } from './expanses.service';

export interface IExpansesState {
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
    this.store.dispatch(new CoreActions.ShowSpinner());
    const expansesState = getState();

    return this.expansesService.loadAll(expansesState.expanses).pipe(
      tap((expanses) =>
        setState({
          ...getState(),
          expanses,
        }),
      ),
      finalize(() => this.store.dispatch(new CoreActions.HideSpinner())),
    );
  }

  @Action(ExpansesActions.Add)
  public addExpense(
    { setState, getState }: StateContext<IExpansesState>,
    { expense }: ExpansesActions.Add,
  ): Observable<IExpense[]> {
    this.store.dispatch(new CoreActions.ShowSpinner());
    const currentExpanses = getState();

    return this.expansesService.add(currentExpanses.expanses, expense).pipe(
      tap((expanses) => {
        console.log('expanses', expanses);
        return setState({
          ...getState(),
          expanses,
        });
      }),
      finalize(() => this.store.dispatch(new CoreActions.HideSpinner())),
    );
  }
}
