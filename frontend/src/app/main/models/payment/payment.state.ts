import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { CoreActions } from '../../../core/store';

import { IPayment } from './payment.interface';
import { PaymentService } from './payment.service';
import { PaymentActions } from './payment.action';

export interface IPaymentState {
  payments: IPayment[];
}

@State<IPaymentState>({
  name: 'payment',
  defaults: {
    payments: [],
  },
})
@Injectable()
export class PaymentState {
  constructor(private paymentService: PaymentService, private store: Store) {}

  @Selector()
  public static payments(state: IPaymentState): IPayment[] {
    return state.payments;
  }

  @Action(PaymentActions.LoadAll)
  public loadPayments({ setState, getState }: StateContext<IPaymentState>): Observable<IPayment[]> {
    this.store.dispatch(new CoreActions.ShowSpinner());
    console.log('eee');
    return this.paymentService.loadPayments().pipe(
      tap((payments) => {
        console.log(payments);
        setState({
          ...getState(),
          payments,
        });
      }),
      finalize(() => this.store.dispatch(new CoreActions.HideSpinner())),
    );
  }
}
