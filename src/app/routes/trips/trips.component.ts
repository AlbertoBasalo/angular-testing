import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Trip } from '@models/trip.interface';
import { TripsService } from './trips.service';

/*
 * 2️⃣ Decoupled implementation:
 * Shared responsibility
 * On Push change detection strategy
 * Reactive form
 * Async pipe subscription
 * Container - presenters pattern
 * State management delegated to the service
 */

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
