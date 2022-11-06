import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Trip } from '@models/trip.interface';
import { TripsService } from './trips.service';

@Component({
  selector: 'app-trips',
  template: `
    <ng-container *ngIf="tripsState$ | async as tripsState">
      <app-trips-list
        [trips]="tripsState.data"
        (delete)="onDeleteTrip($event)"
      ></app-trips-list>
      <ng-container *ngIf="agenciesState$ | async as agencies">
        <app-trips-form
          (save)="onSaveTrip($event)"
          [agencies]="agencies.data"
        ></app-trips-form>
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent {
  tripsState$ = this.service.selectTripsState$();
  agenciesState$ = this.service.selectAgenciesState$();
  constructor(private service: TripsService) {
    this.service.loadAgencies();
    this.service.loadTrips();
  }
  onSaveTrip(trip: Partial<Trip>) {
    this.service.saveTrip(trip);
  }
  onDeleteTrip(trip: Trip) {
    this.service.deleteTrip(trip);
  }
}
