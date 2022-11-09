import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { OptionsForm } from './options.form';
import { OptionsList } from './options.list';
import { OptionsNav } from './options.nav';

@NgModule({
  declarations: [OptionsComponent, OptionsNav, OptionsForm, OptionsList],
  imports: [CommonModule, OptionsRoutingModule],
})
export class OptionsModule {}
