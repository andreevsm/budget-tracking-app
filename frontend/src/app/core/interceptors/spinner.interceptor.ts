import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {finalize} from 'rxjs/operators';

import {UIActions} from '../store';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private store: Store) {
  }

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.store.dispatch(new UIActions.ShowSpinner());

    return next.handle(request).pipe(finalize(() => new UIActions.HideSpinner()));
  }
}
