import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs/operators';

import {IExpense} from './expanses.interface';

@Injectable()
export class ExpansesService {
  public loadAll(expanses: IExpense[]): Observable<IExpense[]> {
    return of(expanses);
  }

  public add(expanses: IExpense[], expense: IExpense): Observable<IExpense[]> {
    const value = [...expanses, expense];
    return of(value).pipe(delay(500));
  }
}
