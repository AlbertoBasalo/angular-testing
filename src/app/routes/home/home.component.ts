import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  template: `
    <app-api *ngIf="trips$ | async as trips" [state]="trips">
      <app-trips-list [trips]="trips.data"></app-trips-list>
    </app-api>
  `,
  providers: [HomeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  trips$ = this.service.selectTrips$();

  constructor(private service: HomeService) {
    this.service.loadTrips();
  }
}
