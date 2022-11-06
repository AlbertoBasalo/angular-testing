import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiModule } from '@components/api/api.module';
import { ApiStore } from '@services/api.store';
import { HomeService } from './home.service';

import { TimeSpanModule } from 'src/app/pipes/time-span/time-span.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TripsList } from './trips.list';

@NgModule({
  declarations: [HomeComponent, TripsList],
  imports: [CommonModule, HomeRoutingModule, ApiModule, TimeSpanModule],
  providers: [HomeService, ApiStore],
})
export class HomeModule {}
