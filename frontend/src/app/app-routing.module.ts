import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainModule } from './main/main.module';
import { HistoryModule } from './history/history.module';
import { StatisticsModule } from './statistics/statistics.module';
import { LoginModule } from './login/login.module';
import { AuthGuard } from './core/auth';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<typeof MainModule> =>
      import('./main/main.module').then((m) => m.MainModule),
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
  {
    path: 'history',
    loadChildren: (): Promise<typeof HistoryModule> =>
      import('./history/history.module').then((m) => m.HistoryModule),
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
  {
    path: 'statistics',
    loadChildren: (): Promise<typeof StatisticsModule> =>
      import('./statistics/statistics.module').then((m) => m.StatisticsModule),
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: (): Promise<typeof LoginModule> =>
      import('./login/login.module').then((m) => m.LoginModule),
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
