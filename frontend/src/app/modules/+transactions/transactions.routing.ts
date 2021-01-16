import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionsContainerComponent } from './containers/transactions-container/transactions-container.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
