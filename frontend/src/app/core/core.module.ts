import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from './store/auth/auth.service';
import { HeaderComponent, SpinnerComponent } from './components';
import { UIState, AuthState, AccountState, AccountService } from './store';
import { localStorageFactory, LOCAL_STORAGE } from './services/local-storage.service';
import { MainLayoutComponent } from './layouts';
import { AuthInterceptor } from './interceptors';
import { TransactionState } from './store/transaction';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxsModule.forFeature([UIState, AccountState, AuthState, TransactionState]),
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
    {
      provide: LOCAL_STORAGE,
      useFactory: localStorageFactory,
      deps: [PLATFORM_ID],
    },
  ],
})
export class CoreModule {}
