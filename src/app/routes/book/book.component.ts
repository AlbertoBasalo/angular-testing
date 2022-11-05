import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '@models/booking.interface';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  template: `
    <app-api *ngIf="trip$ | async as trip" [state]="trip">
      <span *ngFor="let item of trip.data[0] | keyvalue">
        <em>{{ item.key }} </em> <strong>{{ item.value }} </strong>
      </span>
    </app-api>
    <app-book-form [tripId]="tripId" (book)="onBook($event)"></app-book-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  tripId = '';
  trip$ = this.service.selectTrip$();

  constructor(
    route: ActivatedRoute,
    private service: BookService,
    private router: Router
  ) {
    this.tripId = route.snapshot.paramMap.get('tripId') || '';
    this.service.loadTrip(this.tripId);
  }

  onBook(booking: Booking) {
    this.service.saveBooking(booking).subscribe({
      next: (booking) => this.router.navigate(['/']),
      error: (error) => console.log(error),
    });
  }
}
