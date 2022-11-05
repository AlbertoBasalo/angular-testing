import { Injectable } from '@angular/core';
import { Booking } from '@models/booking.interface';
import { Trip } from '@models/trip.interface';
import { ApiService } from '@services/api.service';
import { ApiStore } from '@services/api.store';

@Injectable()
export class BookService {
  constructor(private api: ApiService, private tripsStore: ApiStore<Trip>) {}

  loadTrip(tripId: string) {
    this.tripsStore.setIsWorking();
    this.api.getTripById$(tripId).subscribe({
      next: (trip) => this.tripsStore.setData([trip]),
      error: (error) => this.tripsStore.setError(error.message),
    });
    return this.api.getTripById$(tripId);
  }

  selectTrip$() {
    return this.tripsStore.selectState$();
  }

  saveBooking(booking: Booking) {
    booking.id = `${booking.tripId}-${booking.customer.email}`;
    return this.api.postBooking$(booking);
  }
}
