import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent, AccountsComponent } from './components';
import { HistoryContainerComponent, StatisticsContainerComponent } from './containers';
import { AccountContainerComponent } from './containers/account-container/account-container.component';
import { AccountLayoutComponent } from './layouts';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: ':id',
        component: AccountLayoutComponent,
        children: [
          {
            path: '',
            component: AccountContainerComponent,
          },
          {
            path: 'history',
            component: HistoryContainerComponent,
          },
          {
            path: 'statistics',
            component: StatisticsContainerComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
