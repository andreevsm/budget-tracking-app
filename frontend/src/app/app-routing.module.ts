import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulesLinks } from '@core/constants';

import { AuthGuard, LoginGuard } from './core/auth';
import { MainLayoutComponent } from './core/layouts';
import { SignInModule, MainModule, SignUpModule, TransactionsModule } from './modules';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: ModulesLinks.ACCOUNTS },
      {
        path: ModulesLinks.ACCOUNTS,
        loadChildren: (): Promise<typeof MainModule> =>
          import('./modules/+accounts/accounts.module').then((m) => m.MainModule),
      },
      {
        path: ModulesLinks.TRANSACTIONS,
        loadChildren: (): Promise<typeof TransactionsModule> =>
          import('./modules/+transactions/transactions.module').then((m) => m.TransactionsModule),
      },
    ],
  },
  {
    path: ModulesLinks.SIGN_IN,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard],
    loadChildren: (): Promise<typeof SignInModule> =>
      import('./modules/+sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: ModulesLinks.SIGN_UP,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard],
    loadChildren: (): Promise<typeof SignUpModule> =>
      import('./modules/+sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  { path: '**', redirectTo: '' },
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
