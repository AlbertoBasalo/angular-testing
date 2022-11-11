import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Trip } from '@models/trip.interface';
import { TimeSpan } from 'src/app/pipes/time-span/time-span.pipe';

@Component({
  selector: 'app-trips-list',
  template: `
    <ul>
      <li *ngFor="let trip of trips">
        <span>
          <strong>🔭 {{ trip.destination }} </strong>
        </span>
        <span>
          <em>🚀 {{ trip.startDate | date: 'dd/MM/yyyy' }} </em>
        </span>
        <span>⏱️ {{ getTripTimeSpan(trip) | timeSpan }} </span>
        <span>
          <a [routerLink]="['book', trip.id]" role="button">✍🏼 Book trip</a>
        </span>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsList {
  @Input() trips: Trip[] = [];

  getTripTimeSpan(trip: Trip): TimeSpan {
    return {
      start: new Date(trip.startDate),
      end: new Date(trip.endDate),
    };
  }
}
