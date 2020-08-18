import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then((m) => m.HistoryModule),
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then((m) => m.StatisticsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
