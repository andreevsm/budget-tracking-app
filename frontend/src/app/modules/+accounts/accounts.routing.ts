import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AccountComponent,
  AccountsComponent,
  HistoryComponent,
  StatisticsComponent,
} from './components';

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
        component: StatisticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
