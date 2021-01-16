import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bg-transactions-filter',
  templateUrl: './transactions-filter.component.html',
  styleUrls: ['./transactions-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
