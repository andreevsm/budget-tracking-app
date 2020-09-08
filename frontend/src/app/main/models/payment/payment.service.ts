import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IPayment } from './payment.interface';
import { PAYMENTS } from './payment.mock';

@Injectable()
export class PaymentService {
  public loadPayments(): Observable<IPayment[]> {
    return of(PAYMENTS).pipe(delay(300));
  }
}
