import { Injectable } from '@angular/core';
import { Agency } from '@models/agency.interface';
import { Trip } from '@models/trip.interface';
import { ApiService } from '@services/api.service';
import { ApiStore } from '@services/api.store';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private tripsStore = new ApiStore<Trip>();
  private agenciesStore = new ApiStore<Agency>();
  constructor(private api: ApiService) {}

  selectAgenciesState$() {
    return this.agenciesStore.selectState$();
  }

  loadAgencies() {
    this.agenciesStore.setIsWorking();
    this.api.getAgencies$().subscribe({
      next: (agencies) => {
        this.agenciesStore.setData(agencies);
      },
      error: (error) => {
        this.agenciesStore.setError(error);
      },
    });
  }

  selectTripsState$() {
    return this.tripsStore.selectState$();
  }
  loadTrips() {
    this.tripsStore.setIsWorking();
    this.api.getTrips$().subscribe({
      next: (trips) => this.tripsStore.setData(trips),
      error: (error) => this.tripsStore.setError(error.message),
    });
  }
  saveTrip(trip: Partial<Trip>) {
    this.tripsStore.setIsWorking();
    this.api.postTrip$(trip).subscribe({
      next: (trip) => this.tripsStore.addItem(trip),
      error: (error) => this.tripsStore.setError(error.message),
    });
  }
  deleteTrip(trip: Trip) {
    this.tripsStore.setIsWorking();
    this.api.deleteTrip$(trip.id).subscribe({
      next: () => this.tripsStore.deleteItem(trip),
      error: (error) => this.tripsStore.setError(error.message),
    });
  }
}
