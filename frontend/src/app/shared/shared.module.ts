import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule],
  exports: [MaterialModule, ReactiveFormsModule],
})
export class SharedModule {}
