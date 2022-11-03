import { Injectable } from '@angular/core';
import { Api } from '@models/api.interface';
import { Trip } from '@models/trip.interface';
import { ApiService } from '@services/api.service';
import { Store } from '@services/store.base';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private initialState: Api<Trip[]> = {
    isWorking: false,
    error: '',
    data: [],
  };
  private tripsStore = new Store<Api<Trip[]>>(this.initialState);

  constructor(private api: ApiService) {}

  loadTrips() {
    this.tripsStore.setState({ isWorking: true });
    this.api.getTrips$().subscribe({
      next: (trips) =>
        this.tripsStore.setState({ isWorking: false, error: '', data: trips }),
      error: (error) =>
        this.tripsStore.setState({
          isWorking: false,
          error: error.message,
          data: [],
        }),
    });
  }

  selectIsWorking$() {
    return this.tripsStore.select$((state) => state.isWorking);
  }
  selectTrips$() {
    return this.tripsStore.select$((state) => state.data);
  }
  selectError$() {
    return this.tripsStore.select$((state) => state.error);
  }
}
