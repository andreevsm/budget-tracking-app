import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

import { CoreActions } from './core.actions';

export interface ICoreState {
  spinner: boolean;
}

@State<ICoreState>({
  name: 'core',
  defaults: {
    spinner: false,
  },
})
@Injectable()
export class CoreState {
  @Selector()
  public static spinner(state: ICoreState): boolean {
    return state.spinner;
  }

  @Action(CoreActions.ShowSpinner)
  public showSpinner({ setState, getState }: StateContext<ICoreState>): void {
    setState({
      ...getState(),
      spinner: true,
    });
  }

  @Action(CoreActions.HideSpinner)
  public hideSpinner({ setState, getState }: StateContext<ICoreState>): void {
    setState({
      ...getState(),
      spinner: false,
    });
  }
}
