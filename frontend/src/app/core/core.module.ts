import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { HeaderComponent, SpinnerComponent } from './components';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  imports: [CommonModule, MaterialModule, BrowserAnimationsModule, RouterModule],
  exports: [HeaderComponent, SpinnerComponent],
})
export class CoreModule {}
