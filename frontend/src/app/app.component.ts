import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

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

    this.http
      .get('/api/accounts', {
        headers: new HttpHeaders({
          Authorization:
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYwOTUxMjc3NCwiZXhwIjoxNjEwMTE3NTc0fQ.2ozml80E23TTJiYn-oF_WQnIkz2TCr3n3dRw-BHcZLA',
        }),
      })
      .subscribe((data) => console.log('data', data));
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
