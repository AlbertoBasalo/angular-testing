import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputControl } from './input.control';

@NgModule({
  declarations: [InputControl],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputControl],
})
export class InputModule {}
