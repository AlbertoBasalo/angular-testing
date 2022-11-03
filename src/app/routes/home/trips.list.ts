import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Trip } from '@models/trip.interface';

@Component({
  selector: 'app-trips-list',
  template: `
    <ul>
      <li *ngFor="let trip of trips">
        {{ trip.destination }} - {{ trip.startDate | date: 'dd/MM/yyyy' }}
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsList {
  @Input() trips: Trip[] = [];
}
