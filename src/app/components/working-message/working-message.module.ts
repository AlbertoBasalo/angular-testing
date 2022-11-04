import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkingMessageComponent } from './working-message.component';



@NgModule({
  declarations: [
    WorkingMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WorkingMessageComponent
  ]
})
export class WorkingMessageModule { }
