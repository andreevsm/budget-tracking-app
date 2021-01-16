import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth';
import { LoginGuard } from './core/auth/login.guard';
import { MainLayoutComponent } from './core/layouts';
import { LoginModule, MainModule } from './modules';
import { SignUpModule } from './modules/+sign-up/sign-up.module';
import { TransactionsModule } from './modules/+transactions/transactions.module';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'accounts' },
      {
        path: 'accounts',
        loadChildren: (): Promise<typeof MainModule> =>
          import('./modules/+accounts/accounts.module').then((m) => m.MainModule),
      },
      {
        path: 'transactions',
        loadChildren: (): Promise<typeof TransactionsModule> =>
          import('./modules/+transactions/transactions.module').then((m) => m.TransactionsModule),
      },
    ],
  },
  {
    path: 'login',
    // canLoad: [LoginGuard],
    // canActivate: [LoginGuard],
    loadChildren: (): Promise<typeof LoginModule> =>
      import('./modules/+login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    // canLoad: [LoginGuard],
    // canActivate: [LoginGuard],
    loadChildren: (): Promise<typeof SignUpModule> =>
      import('./modules/+sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  {
    path: '**',
    redirectTo: 'accounts',
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
