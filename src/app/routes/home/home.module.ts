import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TripsList } from './trips.list';

@NgModule({
  declarations: [HomeComponent, TripsList],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
