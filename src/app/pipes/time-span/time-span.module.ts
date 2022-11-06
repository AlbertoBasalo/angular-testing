import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeSpanPipe } from './time-span.pipe';

@NgModule({
  declarations: [TimeSpanPipe],
  imports: [CommonModule],
  exports: [TimeSpanPipe],
})
export class TimeSpanModule {}
