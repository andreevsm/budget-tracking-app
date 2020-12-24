import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

import { MaterialModule } from '../shared/material/material.module';

import { AuthService } from './store/auth/auth.service';
import { HeaderComponent, SpinnerComponent, SidenavComponent } from './components';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { UIState, AuthState, AccountState, AccountService } from './store';
import { localStorageFactory, LOCAL_STORAGE } from './services/local-storage.service';
import { MainLayoutComponent } from './layouts';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent, SidenavComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxsModule.forFeature([UIState, AccountState, AuthState]),
    MaterialModule,
  ],
  exports: [HeaderComponent, SpinnerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
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
