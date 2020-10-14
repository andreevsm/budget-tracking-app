import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

import { UIActions } from './ui.actions';

interface IUIState {
  spinner: boolean;
}

@State<IUIState>({
  name: 'ui',
  defaults: {
    spinner: false,
  },
})
@Injectable()
export class UIState {
  @Selector()
  public static spinner(state: IUIState): boolean {
    return state.spinner;
  }

  @Action(UIActions.ShowSpinner)
  public showSpinner({ setState, getState }: StateContext<IUIState>): void {
    setState({
      ...getState(),
      spinner: true,
    });
  }

  @Action(UIActions.HideSpinner)
  public hideSpinner({ setState, getState }: StateContext<IUIState>): void {
    setState({
      ...getState(),
      spinner: false,
    });
  }
}
