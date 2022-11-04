import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorMessageModule } from '@components/error-message/error-message.module';
import { WorkingMessageModule } from '@components/working-message/working-message.module';
import { ApiComponent } from './api.component';

@NgModule({
  declarations: [ApiComponent],
  imports: [WorkingMessageModule, ErrorMessageModule, CommonModule],
  exports: [ApiComponent],
})
export class ApiModule {}
