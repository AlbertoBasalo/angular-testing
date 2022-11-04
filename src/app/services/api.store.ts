import { Injectable } from '@angular/core';
import { Api } from '@models/api.interface';
import { BaseStore } from './base.store';

@Injectable()
export class ApiStore<T> {
  private initialState: Api<T> = {
    isWorking: false,
    error: '',
    data: [],
  };
  private baseStore = new BaseStore<Api<T>>(this.initialState);

  setWorking() {
    this.baseStore.setState({ isWorking: true });
  }
  setData(data: T[]) {
    this.baseStore.setState({ isWorking: false, error: '', data });
  }
  setError(error: string) {
    this.baseStore.setState({ isWorking: false, error, data: [] });
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
