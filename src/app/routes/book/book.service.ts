import { Injectable } from '@angular/core';
import { Booking } from '@models/booking.interface';
import { Trip } from '@models/trip.interface';
import { ApiService } from '@services/api.service';
import { ApiStore } from '@services/api.store';

@Injectable()
export class BookService {
  private tripsStore = new ApiStore<Trip>();
  private bookingsStore = new ApiStore<Booking>();
  constructor(private api: ApiService) {}

  loadTrip(tripId: string) {
    this.tripsStore.setIsWorking();
    this.api.getTripById$(tripId).subscribe({
      next: (trip) => this.tripsStore.setData([trip]),
      error: (error) => this.tripsStore.setError(error.message),
    });
  }

  selectTripState$() {
    return this.tripsStore.selectState$();
  }

  saveBooking(booking: Booking) {
    this.bookingsStore.setIsWorking();
    this.api.postBooking$(booking).subscribe({
      next: (booking) => this.bookingsStore.setData([booking]),
      error: (error) => this.bookingsStore.setError(error.message),
    });
  }

  selectBookingsState$() {
    return this.bookingsStore.selectState$();
  }
  // ToDo: check finished ok
  selectBookingsSuccess$() {
    return this.bookingsStore.selectSuccess$();
  }
}
