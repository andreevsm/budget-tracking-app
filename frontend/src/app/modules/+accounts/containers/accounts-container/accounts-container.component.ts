import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bg-accounts-container',
  templateUrl: './accounts-container.component.html',
  styleUrls: ['./accounts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
