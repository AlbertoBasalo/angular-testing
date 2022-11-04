import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Trip } from '@models/trip.interface';

@Component({
  selector: 'app-trips-list',
  template: `
    <ul>
      <li *ngFor="let trip of trips">
        <strong>{{ trip.destination }} </strong>
        <em>{{ trip.startDate | date: 'dd/MM/yyyy' }}</em>
        <a [routerLink]="['book', trip.id]">✍🏼 Book trip</a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsList {
  @Input() trips: Trip[] = [];
}
