import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { makeEntityByKey } from '@utils/helpers';
import { tap } from 'rxjs/operators';
import { CurrencyActions } from './currency.action';
import { ICurrency } from './currency.interface';
import { CurrencyService } from './currency.service';

export interface ICurrencyState {
  currencies: Record<number, ICurrency>;
}

@State<ICurrencyState>({
  name: 'currency',
  defaults: {
    currencies: {},
  },
})
@Injectable()
export class CurrencyState {
  constructor(private currencyService: CurrencyService) {}

  @Selector()
  public static currencies(state: ICurrencyState): Record<number, ICurrency> {
    return state.currencies;
  }

  @Action(CurrencyActions.LoadAll)
  public loadAll({ setState, getState }: StateContext<ICurrencyState>): any {
    return this.currencyService.loadAll().pipe(
      tap((currencyList) => {
        const currencies = makeEntityByKey(currencyList, (currency) => currency.id);

        setState({
          ...getState(),
          currencies,
        });
      }),
    );
  }
}
