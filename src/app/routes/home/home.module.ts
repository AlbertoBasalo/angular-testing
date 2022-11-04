import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorMessageModule } from '@components/error-message/error-message.module';
import { WorkingMessageModule } from '@components/working-message/working-message.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TripsList } from './trips.list';

@NgModule({
  declarations: [HomeComponent, TripsList],
  imports: [
    CommonModule,
    HomeRoutingModule,
    WorkingMessageModule,
    ErrorMessageModule,
  ],
})
export class HomeModule {}
