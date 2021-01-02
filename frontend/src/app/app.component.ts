import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ACCOUNTS_API } from './core/constants';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.createWorker();

    setTimeout(() => {
      this.http.get(ACCOUNTS_API).subscribe((data) => console.log('data', data));
    }, 15000);
  }

  private createWorker(): void {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('./app.worker', { type: 'module' });
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
