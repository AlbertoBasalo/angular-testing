import { Injectable } from '@angular/core';
import { Api, API_INITIAL_STATE } from '@models/api.interface';
import { BaseStore } from './base.store';

@Injectable()
export class ApiStore<T> {
  private baseStore = new BaseStore<Api<T>>(API_INITIAL_STATE);

  setWorking() {
    this.baseStore.setState({ isWorking: true });
  }
  setData(data: T[]) {
    this.baseStore.setState({ isWorking: false, error: '', data });
  }
  setError(error: string) {
    this.baseStore.setState({ isWorking: false, error, data: [] });
  }
  selectState$() {
    return this.baseStore.select$((state) => state);
  }
  selectIsWorking$() {
    return this.baseStore.select$((state) => state.isWorking);
  }
  selectData$() {
    return this.baseStore.select$((state) => state.data);
  }
  selectError$() {
    return this.baseStore.select$((state) => state.error);
  }
}
