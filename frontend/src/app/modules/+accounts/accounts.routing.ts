import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  HistoryContainerComponent,
  AccountContainerComponent,
  AccountsContainerComponent,
} from './containers';
import { AccountLayoutComponent } from './layouts';

const routes: Routes = [
  {
    path: '',
    component: AccountsContainerComponent,
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
