import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Trip } from '@models/trip.interface';

@Component({
  selector: 'app-trips-list',
  template: `
    <ul>
      <li *ngFor="let trip of trips">
        {{ trip.destination }} {{ trip.startDate | date: 'shortDate' }}
        <span (click)="delete.emit(trip)"
          >🗑️ <small>{{ trip.id }}</small></span
        >
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsList {
  @Input() trips: Trip[] = [];
  @Output() delete = new EventEmitter<Trip>();
}
