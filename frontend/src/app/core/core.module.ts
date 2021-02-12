import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from './store/auth';
import { HeaderComponent, SpinnerComponent } from './components';
import {
  UIState,
  AuthState,
  AccountState,
  AccountService,
  CategoryState,
  CategoryService,
  CurrencyState,
  CurrencyService,
  TransactionService,
  TransactionState,
} from './store';
import { localStorageFactory, LOCAL_STORAGE } from './services/local-storage.service';
import { MainLayoutComponent } from './layouts';
import { AuthInterceptor } from './interceptors';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxsModule.forFeature([
      UIState,
      AccountState,
      AuthState,
      TransactionState,
      CategoryState,
      CurrencyState,
    ]),
    MatProgressSpinnerModule,
  ],
  exports: [HeaderComponent, SpinnerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AccountService,
    AuthService,
    TransactionService,
    CategoryService,
    CurrencyService,
    {
      provide: LOCAL_STORAGE,
      useFactory: localStorageFactory,
      deps: [PLATFORM_ID],
    },
  ],
})
export class CoreModule {}
