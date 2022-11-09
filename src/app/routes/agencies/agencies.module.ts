import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AgenciesRoutingModule } from './agencies-routing.module';
import { AgenciesComponent } from './agencies.component';

@NgModule({
  declarations: [AgenciesComponent],
  imports: [CommonModule, AgenciesRoutingModule, FormsModule],
})
export class AgenciesModule {}
