import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bg-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
