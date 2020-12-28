import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent, AccountsComponent, HistoryComponent } from './components';
import { StatisticsContainerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: ':id',
        component: AccountComponent,
      },
      {
        path: ':id/history',
        component: HistoryComponent,
      },
      {
        path: ':id/statistics',
        component: StatisticsContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
