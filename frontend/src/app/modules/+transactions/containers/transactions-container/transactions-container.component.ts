import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bg-transactions-container',
  templateUrl: './transactions-container.component.html',
  styleUrls: ['./transactions-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsContainerComponent implements OnInit {
  public isAddingTransactionShown = false;

  constructor() {}

  ngOnInit(): void {}

  public onAddTransactionBlock(): void {
    this.isAddingTransactionShown = true;
  }
}
