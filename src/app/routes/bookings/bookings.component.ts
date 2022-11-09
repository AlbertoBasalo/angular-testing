import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Booking } from '@models/booking.interface';
import { ApiService } from '@services/api.service';
import { Observable, of } from 'rxjs';

/*
 * 1️⃣ Simple implementation:
 * All responsibility on the same place
 * On Push change detection strategy
 * Reactive form
 * Async pipe subscription
 */

@Component({
  selector: 'app-bookings',
  template: `
    <table role="grid">
      <thead>
        <tr>
          <th><strong>Trip Id</strong></th>
          <th><strong>Customer</strong></th>
          <th><strong>Email</strong></th>
          <th><strong>Seats</strong></th>
          <th><strong>Date</strong></th>
          <th><strong>Delete</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let booking of bookings$ | async">
          <td>{{ booking.tripId }}</td>
          <td>{{ booking.customer.name }}</td>
          <td>{{ booking.customer.email }}</td>
          <td>{{ booking.seats }}</td>
          <td>{{ booking.date | date: 'yyyy-MMM-dd' }}</td>
          <td><button (click)="onDeleteClick(booking.id)">🗑️</button></td>
        </tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent {
  bookings$: Observable<Booking[]> = of([]);

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {
    this.loadBookings();
  }

  loadBookings() {
    this.bookings$ = this.api.getBookings$();
  }

  onDeleteClick(bookingId: string) {
    this.api.deleteBooking$(bookingId).subscribe(() => {
      this.loadBookings();
      this.cdr.detectChanges();
    });
  }
}
