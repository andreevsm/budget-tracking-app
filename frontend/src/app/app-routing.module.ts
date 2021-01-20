import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@environments/environment';

import { AuthGuard } from './core/auth';
// import { LoginGuard } from './core/auth/login.guard';
import { MainLayoutComponent } from './core/layouts';
import { SignInModule, MainModule, SignUpModule, TransactionsModule } from './modules';

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
    path: 'signin',
    // canLoad: [LoginGuard],
    // canActivate: [LoginGuard],
    loadChildren: (): Promise<typeof SignInModule> =>
      import('./modules/+sign-in/sign-in.module').then((m) => m.SignInModule),
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
      // enableTracing: !environment.production,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
