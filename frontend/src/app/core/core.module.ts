import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';

import {MaterialModule} from '../shared/material/material.module';

import {UserService} from './store/user/user.service';
import {UserState} from './store/user/user.state';
import {HeaderComponent, SpinnerComponent, SidenavComponent} from './components';
import {SpinnerInterceptor} from './interceptors/spinner.interceptor';
import {UIState, ExpansesState, ExpansesService} from './store';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent, SidenavComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxsModule.forFeature([UIState, ExpansesState, UserState]),
    MaterialModule,
  ],
  exports: [HeaderComponent, SpinnerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    ExpansesService,
    UserService,
  ],
})
export class CoreModule {
}
