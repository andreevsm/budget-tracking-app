import {ExpansesActions} from 'src/app/core/store';
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngxs/store';

import {UserActions} from './core/store/user/user.actions';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new ExpansesActions.LoadAll());
    this.store.dispatch(new UserActions.Load());
    this.createWorker();
  }

  private createWorker(): void {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('./app.worker', {type: 'module'});
      // worker.onmessage = ({ data }) => {
      //   console.log(`page got message: ${data}`);
      // };
      worker.postMessage('hello');
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}
