import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OptionsControl } from './options.control';

@NgModule({
  declarations: [OptionsControl],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [OptionsControl],
})
export class OptionsModule {}
