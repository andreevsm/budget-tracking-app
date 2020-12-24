import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './core/layouts';
import { HistoryModule, LoginModule, MainModule, StatisticsModule } from './modules';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'accounts' },
      {
        path: 'accounts',
        loadChildren: (): Promise<typeof MainModule> =>
          import('./modules/+accounts/accounts.module').then((m) => m.MainModule),
      },
      {
        path: 'history',
        loadChildren: (): Promise<typeof HistoryModule> =>
          import('./modules/+history/history.module').then((m) => m.HistoryModule),
      },
      {
        path: 'statistics',
        loadChildren: (): Promise<typeof StatisticsModule> =>
          import('./modules/+statistics/statistics.module').then((m) => m.StatisticsModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: (): Promise<typeof LoginModule> =>
      import('./modules/+login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
