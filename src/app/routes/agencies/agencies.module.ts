import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenciesRoutingModule } from './agencies-routing.module';
import { AgenciesComponent } from './agencies.component';


@NgModule({
  declarations: [
    AgenciesComponent
  ],
  imports: [
    CommonModule,
    AgenciesRoutingModule
  ]
})
export class AgenciesModule { }
