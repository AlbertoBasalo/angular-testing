import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips.component';
import { TripsForm } from './trips.form';
import { TripsList } from './trips.list';

@NgModule({
  declarations: [TripsComponent, TripsForm, TripsList],
  imports: [CommonModule, TripsRoutingModule, ReactiveFormsModule],
})
export class TripsModule {}
