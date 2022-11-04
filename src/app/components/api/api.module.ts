import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorModule } from '@components/error/error.module';
import { WorkingModule } from '@components/working/working.module';
import { ApiComponent } from './api.component';

@NgModule({
  declarations: [ApiComponent],
  imports: [WorkingModule, ErrorModule, CommonModule],
  exports: [ApiComponent],
})
export class ApiModule {}
