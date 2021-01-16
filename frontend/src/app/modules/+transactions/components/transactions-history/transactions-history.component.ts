import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ITransaction } from '../../store';

@Component({
  selector: 'bg-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsHistoryComponent implements OnInit {
  @Input() public transactions: ITransaction[] = [];

  constructor() {}

  public ngOnInit(): void {}
}
