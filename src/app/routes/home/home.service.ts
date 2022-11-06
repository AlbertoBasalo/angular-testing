import { Injectable } from '@angular/core';
import { Trip } from '@models/trip.interface';
import { ApiService } from '@services/api.service';
import { ApiStore } from '@services/api.store';

@Injectable()
export class HomeService {
  private tripsStore = new ApiStore<Trip>();
  constructor(private api: ApiService) {}

  loadTrips() {
    this.tripsStore.setIsWorking();
    this.api.getTrips$().subscribe({
      next: (trips) => this.tripsStore.setData(trips),
      error: (error) => this.tripsStore.setError(error.message),
    });
  }
  selectTrips$() {
    return this.tripsStore.selectState$();
  }
}
