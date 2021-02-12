import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CURRENCIES_API } from '@core/constants';
import { Observable } from 'rxjs';
import { ICurrency } from './currency.interface';

@Injectable()
export class CurrencyService {
  constructor(private http: HttpClient) {}

  public loadAll(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(CURRENCIES_API);
  }
}
