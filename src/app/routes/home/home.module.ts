import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiModule } from '@components/api/api.module';
import { ApiStore } from '@services/api.store';
import { HomeService } from '../home.service';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TripsList } from './trips.list';

@NgModule({
  declarations: [HomeComponent, TripsList],
  imports: [CommonModule, HomeRoutingModule, ApiModule],
  providers: [HomeService, ApiStore],
})
export class HomeModule {}
