import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '@models/booking.interface';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  template: `
    <ng-container *ngIf="trip$ | async as trip">
      <app-api [state]="trip">
        <span *ngFor="let item of trip.data[0] | keyvalue">
          <em>{{ item.key }} </em> <strong>{{ item.value }} </strong>
        </span>
      </app-api>
      <app-book-form
        *ngIf="trip.data[0]"
        [tripId]="trip.data[0].id"
        [places]="trip.data[0].places"
        (book)="onBook($event)"
      ></app-book-form>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  trip$ = this.service.selectTrip$();

  constructor(
    route: ActivatedRoute,
    private service: BookService,
    private router: Router
  ) {
    const tripId = route.snapshot.paramMap.get('tripId') || '';
    this.service.loadTrip(tripId);
  }

  onBook(booking: Booking) {
    this.service.saveBooking(booking).subscribe({
      next: (booking) => this.router.navigate(['/', 'bookings']),
      error: (error) => console.log(error),
    });
  }
}
