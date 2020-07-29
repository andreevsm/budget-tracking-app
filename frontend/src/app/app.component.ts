import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddAnimal } from './store';
import { Observable } from 'rxjs';

@Component({
  selector: 'bt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  @Select((state: any) => state.animals) animals$: Observable<any>;

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('./app.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.postMessage('hello');
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name));
  }
}