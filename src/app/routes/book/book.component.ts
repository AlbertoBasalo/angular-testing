import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '@models/booking.interface';
import { UtilsService } from '@services/utils.service';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  template: `
    <app-api
      *ngIf="bookingsState$ | async as bookingsState"
      [state]="bookingsState"
    ></app-api>
    <app-api *ngIf="tripState$ | async as tripState" [state]="tripState">
      <ng-container *ngIf="tripState.data[0]">
        <section>
          <strong>🔭 {{ tripState.data[0].destination }} ➖ </strong>
          <em>💸 {{ tripState.data[0].flightPrice | currency }} </em>
          <em>🧑🏼‍🚀 {{ tripState.data[0].places }} </em>
        </section>
        <app-book-form
          [tripId]="tripState.data[0].id"
          [places]="tripState.data[0].places"
          (book)="onBook($event)"
        ></app-book-form>
      </ng-container>
    </app-api>
  `,
  providers: [BookService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  tripState$ = this.service.selectTripState$();
  bookingsState$ = this.service.selectBookingsState$();
  bookingsSuccess$ = this.service.selectBookingsSuccess$();

  constructor(
    route: ActivatedRoute,
    utils: UtilsService,
    private service: BookService,
    private router: Router
  ) {
    const tripId = utils.getParam(route, 'tripId');
    this.service.loadTrip(tripId);
    this.bookingsSuccess$.subscribe((success) => {
      success && this.router.navigate(['/', 'bookings']);
    });
  }

  onBook(booking: Booking) {
    this.service.saveBooking(booking);
  }
}
