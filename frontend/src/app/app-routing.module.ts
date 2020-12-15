import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainModule} from './main/main.module';
import {HistoryModule} from './history/history.module';
import {StatisticsModule} from './statistics/statistics.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<typeof MainModule> =>
      import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'history',
    loadChildren: (): Promise<typeof HistoryModule> =>
      import('./history/history.module').then((m) => m.HistoryModule),
  },
  {
    path: 'statistics',
    loadChildren: (): Promise<typeof StatisticsModule> =>
      import('./statistics/statistics.module').then((m) => m.StatisticsModule),
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
export class AppRoutingModule {
}
