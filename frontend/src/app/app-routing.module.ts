import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth';
import { LoginGuard } from './core/auth/login.guard';
import { MainLayoutComponent } from './core/layouts';
import { LoginModule, MainModule } from './modules';

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
